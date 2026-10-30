import { useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { IMAGES } from "./images";
import { CustomerSpeech } from "./components/CustomerSpeech/CustomerSpeech";
import { OrderSheet } from "./components/OrderSheet/OrderSheet";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { ItemPicker } from "./components/ItemPicker/ItemPicker";
import "./CustomOrder.css";

interface OrderItem {
    productId: string;
    extraId?: string
}

export function CustomOrder({ step, stepIndex, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback }: StepScreenProps) {

    const [items, setItems] = useState<OrderItem[]>([]);
    const [wrong, setWrong] = useState(false);

    if (step.type !== "custom-order") return null;
    const { content } = step;

    const usedSlots = items.reduce((total, item) => total + (item.extraId ? 2 : 1), 0);

    const remaining = content.maxItems - usedSlots;

    const productImage = (id: string) => {
        const product = content.products.find((p) => p.id === id);
        return product ? IMAGES[product.image] : "";
    };

    const extraImage = (id: string) => {
        const extra = content.extras.find((p) => p.id === id);
        return extra ? IMAGES[extra.image] : "";
    };

    function handleAddItem(productId: string, extraId: string, quantity: number) {
        if (locked) return;

        const slotsPerItem = extraId ? 2 : 1;
        const available = Math.floor(remaining / slotsPerItem);

        if (available <= 0) {
            showFeedback({ type: "warning", text: content.messages.full });
            return;
        }

        const toAdd = Math.min(quantity, available);

        setItems((prev) => [
            ...prev,
            ...Array.from({ length: toAdd }, () => ({
                productId,
                extraId: extraId || undefined
            }))
        ]);

        setWrong(false);
        clearFeedback();
    }

    function handleRemove(index: number) {
        if (locked) return;

        let currentIndex = 0;

        const itemIndex = items.findIndex((item) => {
            const slots = item.extraId ? 2 : 1;
            const matches = index >= currentIndex && index < currentIndex + slots;

            currentIndex += slots;
            return matches;
        });

        if (itemIndex === -1) return;

        setItems((prev) => prev.filter((_, i) => i !== itemIndex));

        setWrong(false);
        clearFeedback();
    }

    function handleFinalize() {
        if (locked) {
            onContinue();
            return;
        }

        if (items.length === 0) {
            setWrong(false);
            showFeedback({ type: "warning", text: content.messages.incomplete });
            return;
        }

        const counts: Record<string, number> = {};
        items.forEach((item) => {
            const key = `${item.productId}:${item.extraId ?? "none"}`;
            counts[key] = (counts[key] ?? 0) + 1;
        });

        const ids = new Set([...Object.keys(counts), ...Object.keys(content.answer)]);
        const correct = [...ids].every((id) => (counts[id] ?? 0) === (content.answer[id] ?? 0));

        if (!correct) {
            setWrong(true);
            showFeedback({ type: "error", text: content.messages.wrong });
            return;
        }

        setWrong(false);
        showFeedback({ type: "success", text: content.messages.success });
        onComplete();
    }

    return (
        <div className="custom-order">
            <div className="custom-order-top">
                <CustomerSpeech
                    image={IMAGES[content.customer]}
                    text={content.speech}
                />

                <OrderSheet
                    number={content.order.number}
                    slots={content.maxItems}
                    items={items.flatMap((item) => [
                        productImage(item.productId),
                        ...(item.extraId ? [extraImage(item.extraId)] : [])
                    ])} 
                    details={content.order.details}
                    finalizeLabel={locked ? continueLabel : content.finalizeLabel}
                    wrong={wrong}
                    locked={locked}
                    onRemove={handleRemove}
                    onFinalize={handleFinalize}
                />
            </div>
            <ResourceCenter className="order-center">
                <ItemPicker
                    products={content.products}
                    extras={content.extras}
                    maxQuantity={Math.max(remaining, 1)}
                    addLabel={content.addLabel}
                    showExtra={stepIndex !== 0}
                    disabled={locked}
                    onAdd={handleAddItem}
                />
            </ResourceCenter>
        </div>
    );
}