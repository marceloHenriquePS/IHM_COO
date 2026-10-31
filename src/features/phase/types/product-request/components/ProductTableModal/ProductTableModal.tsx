import { useState } from "react";
import { Modal } from "@/shared/components/Modal/Modal";
import "./ProductTableModal.css";

interface ProductTableModalProps {
    open: boolean;
    mode: "get" | "set";
    title: string;
    columns: { id: string; label: string }[];
    products: ({ id: string } & Record<string, string>)[];
    labels: { getPrompt: string; setPrompt: string; productPrompt: string; confirm: string };
    onConfirmGet: (answer: string) => string | null;
    onConfirmSet: (productId: string, attributeId: string, value: string) => string | null;
    onClose: () => void;
}

export function ProductTableModal({
    open, mode, title, columns, products, labels, onConfirmGet, onConfirmSet, onClose,
}: ProductTableModalProps) {
    const [answer, setAnswer] = useState("");
    const [productId, setProductId] = useState(products[0]?.id ?? "");
    const [attributeId, setAttributeId] = useState(columns[0]?.id ?? "");
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | null>(null);

    const nameColumn = columns[0]?.id;

    function submit() {
        const message =
            mode === "get"
                ? onConfirmGet(answer)
                : onConfirmSet(productId, attributeId, value);
        setError(message);
    }

    function onKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter") submit();
    }

    return (
        <Modal open={open} title={title} onClose={onClose}>
            <div className="product-table-wrap">
                <table className="product-table">
                    <thead>
                        <tr>
                            {columns.map((c) => <th key={c.id} scope="col">{c.label}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                {columns.map((c) => <td key={c.id}>{p[c.id]}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {mode === "get" ? (
                <div className="product-modal-form">
                    <label>
                        <span>{labels.getPrompt}</span>
                        <input
                            value={answer}
                            onChange={(e) => { setAnswer(e.target.value); setError(null); }}
                            onKeyDown={onKeyDown}
                        />
                    </label>
                    <button type="button" onClick={submit}>{labels.confirm}</button>
                </div>
            ) : (
                <div className="product-modal-form">
                    <div className="product-modal-fields">
                        <span>{labels.setPrompt}</span>
                        
                        <label>
                            <span>{labels.productPrompt}</span>
                            <select
                                value={productId}
                                onChange={(e) => { setProductId(e.target.value); setError(null); }}
                            >
                                {products.map((p) => (
                                    <option key={p.id} value={p.id}>{p[nameColumn]}</option>
                                ))}
                            </select>
                        </label>

                        <label>
                            <div className="product-modal-pair">
                                <select
                                    value={attributeId}
                                    onChange={(e) => { setAttributeId(e.target.value); setError(null); }}
                                >
                                    {columns.map((c) => (
                                        <option key={c.id} value={c.id}>{c.label}</option>
                                    ))}
                                </select>
                                <input
                                    value={value}
                                    onChange={(e) => { setValue(e.target.value); setError(null); }}
                                    onKeyDown={onKeyDown}
                                />
                            </div>
                        </label>
                    </div>
                    <button type="button" onClick={submit}>{labels.confirm}</button>
                </div>
            )}

            <p className="product-modal-error" role="alert">{error}</p>
        </Modal>
    );
}