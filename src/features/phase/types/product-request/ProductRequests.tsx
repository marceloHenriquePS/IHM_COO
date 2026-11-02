import { useEffect, useRef, useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { ActionList } from "../../components/ActionList/ActionList";
import { IMAGES } from "./images";
import { Dialogue } from "../../components/Dialogue/Dialogue";
import { ProductTableModal } from "./components/ProductTableModal/ProductTableModal";
import "./ProductRequests.css";

const NEXT_REQUEST_MS = 2500;

const normalize = (text: string) =>
    text.toLowerCase().replace(/r\$/g, "").replace(/\s/g, "");

export function ProductRequests({
    step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback,
}: StepScreenProps) {
    const [requestIndex, setRequestIndex] = useState(0);
    const [reply, setReply] = useState<string | null>(null);
    const [resolved, setResolved] = useState(false);
    const [mode, setMode] = useState<"get" | "set" | null>(null);
    const [products, setProducts] = useState(() =>
        step.type === "product-requests" ? step.content.products : []
    );
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    if (step.type !== "product-requests") return null;
    const { content } = step;
    const { messages } = content;
    const request = content.requests[requestIndex];
    const isLastRequest = requestIndex === content.requests.length - 1;

    function finishRequest() {
        setMode(null);
        setResolved(true);
        setReply(request.reply);

        if (isLastRequest) {
            showFeedback({ type: "success", text: messages.success });
            onComplete();
            return;
        }

        timer.current = setTimeout(() => {
            setRequestIndex((i) => i + 1);
            setReply(null);
            setResolved(false);
        }, NEXT_REQUEST_MS);
    }

    function handleAction(id: string) {
        if (!request) return;
        clearFeedback();

        if (id !== request.method) {
            showFeedback({ type: "error", text: messages.wrongMethod[request.method] });
            return;
        }

        setMode(request.method);
    }

    function confirmGet(answer: string): string | null {
        if (!answer.trim()) return messages.emptyAnswer;

        const real = products.find((p) => p.id === request.productId)?.[request.attributeId] ?? "";
        if (normalize(answer) !== normalize(real)) return messages.wrongAnswer;

        finishRequest();
        return null;
    }

    function confirmSet(productId: string, attributeId: string, value: string): string | null {
        if (!value.trim()) return messages.emptyValue;
        if (productId !== request.productId) return messages.wrongProduct;
        if (attributeId !== request.attributeId) return messages.wrongAttribute;
        if (normalize(value) !== normalize(request.value)) return messages.wrongValue;

        setProducts((prev) =>
            prev.map((p) => (p.id === productId ? { ...p, [attributeId]: request.value } : p))
        );
        finishRequest();
        return null;
    }

    const actions = content.actions.map((a) => ({
        id: a.id, title: a.title, call: a.call, icon: ICONS[a.icon],
    }));

    return (
        <div className="product-requests">
            <Dialogue
                label={content.employeeLabel}
                text={request?.text ?? null}
                image={IMAGES[content.employeeImage]}
                side="left"
            />

            <Dialogue
                label={content.playerLabel}
                text={reply}
                image={IMAGES[content.playerImage]}
                side="right"
                typingSpeed={20}
            />

            <ResourceCenter icon={ICONS.box} className="requests-center">
                <ActionList
                    actions={actions}
                    disabled={locked || resolved}
                    onAction={handleAction}
                />
            </ResourceCenter>

            {locked && (
                <button className="requests-continue" type="button" onClick={onContinue}>
                    {continueLabel}
                </button>
            )}

            {mode && (
                <ProductTableModal
                    key={`${request.id}-${mode}`}
                    open
                    mode={mode}
                    title={content.tableTitle}
                    columns={content.columns}
                    products={products}
                    labels={content.labels}
                    onConfirmGet={confirmGet}
                    onConfirmSet={confirmSet}
                    onClose={() => setMode(null)}
                />
            )}
        </div>
    );
}