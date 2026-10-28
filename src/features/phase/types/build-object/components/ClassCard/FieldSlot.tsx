import { DropSlot } from "@/features/phase/components/DropSlot/DropSlot";

interface FieldSlotProps {
    id: string;
    label: string;
    icon: string;
    value: string | null;
    wrong?: boolean;
    locked?: boolean;
    onDropValue: (value: string) => void;
    onClear: () => void;
}

export function FieldSlot({ id, label, icon, value, wrong, locked, onDropValue, onClear }: FieldSlotProps) {
    return (
        <div className="field-slot">
            <div className="field-slot-label">
                <img src={icon} alt="" className="field-slot-icon" />
                <span>{label}</span>
            </div>

            <DropSlot
                accept={id}
                value={value}
                wrong={wrong}
                locked={locked}
                onDropValue={onDropValue}
                onClear={onClear}
            />
        </div>
    );
}