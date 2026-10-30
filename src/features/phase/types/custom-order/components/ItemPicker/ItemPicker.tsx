import { useState } from "react";
import "./ItemPicker.css"

interface ItemPickerProps {
    products: { id: string; name: string }[];
    extras: { id: string; name: string }[];
    maxQuantity: number;
    addLabel: string;
    showExtra?: boolean;
    disabled?: boolean;
    onAdd: (productId: string, extraId: string, quantity: number) => void;
}

export function ItemPicker({ products, extras, maxQuantity, addLabel, showExtra, disabled, onAdd }: ItemPickerProps) {
    const [productId, setProductId] = useState(products[0]?.id ?? "");
    const [extraId, setExtraId] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleAdd() {
        if (!productId) return;

        onAdd(productId, showExtra ? extraId: "", quantity);
        setQuantity(1);
    }

    return (
        <div className="item-picker">
            <span className="item-picker-call">adicionarItem(</span>

            <label className="item-picker-field">
                <select
                    value={productId}
                    disabled={disabled}
                    onChange={(e) => setProductId(e.target.value)}
                >
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </label>

            {showExtra && (
                <>
                    <span>,</span>

                    <label className="item-picker-field">
                        <select
                            value={extraId}
                            disabled={disabled}
                            onChange={(e) => setExtraId(e.target.value)}
                        >
                            <option value="">Nenhum</option>

                            {extras.map((extra) => (
                                <option key={extra.id} value={extra.id}>
                                    {extra.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <span>,</span>
                </>
            )}

            <div className="item-picker-field">
                <div className="item-picker-counter">
                    <button
                        type="button"
                        aria-label="Diminuir quantidade"
                        disabled={disabled || quantity <= 1}
                        onClick={() => setQuantity((q) => q - 1)}
                    >
                        -
                    </button>

                    <output aria-live="polite">{quantity}</output>

                    <button
                        type="button"
                        aria-label="Aumentar quantidade"
                        disabled={disabled || quantity >= maxQuantity}
                        onClick={() => setQuantity((q) => q + 1)}
                    >
                        +
                    </button>
                </div>
            </div>

            <span>)</span>

            <button
                type="button"
                className="item-picker-add"
                disabled={disabled || !productId}
                onClick={handleAdd}
            >
                {addLabel}
            </button>
        </div>
    );
}
