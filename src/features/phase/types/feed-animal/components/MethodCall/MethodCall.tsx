import { DropSlot } from "@/features/phase/components/DropSlot/DropSlot";
import "./MethodCall.css";

interface MethodCallProps {
    method: string;
    values: (string | null)[];
    wrongIndexes?: number[];
    locked?: boolean;
    onDropFood: (index: number, food: string) => void;
    onClear: (index: number) => void;
}

export function MethodCall({
    method, values, wrongIndexes = [], locked, onDropFood, onClear,
}: MethodCallProps) {
    return (
        <div className="method-call">
            <span className="method-call-text">{method}(</span>

            {values.map((value, i) => (
                <DropSlot
                    key={i}
                    accept="food"
                    value={value}
                    placeholder="+"
                    wrong={wrongIndexes.includes(i)}
                    locked={locked}
                    onDropValue={(food) => onDropFood(i, food)}
                    onClear={() => onClear(i)}
                />
            ))}

            <span className="method-call-text">)</span>
        </div>
    );
}