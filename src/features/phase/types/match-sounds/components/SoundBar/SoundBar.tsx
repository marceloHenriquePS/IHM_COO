import { ResourceChip } from "@/features/phase/components/ResourceChip/ResourceChip";
import "./SoundBar.css";

const COLORS = [
    "#e8566e", "#ffd84d", "#4f9a6b", "#5878a8", "#a85fc8",
    "#555555", "#ef9150", "#ff5ccf", "#6fe8ea", "#5cf05c",
];

interface SoundBarProps {
    numbers: string[];
    playing: string | null;
    locked?: boolean;
    onPlay: (number: string) => void;
}

export function SoundBar({ numbers, playing, locked, onPlay }: SoundBarProps) {
    return (
        <div className="sound-bar">
            {numbers.map((n, i) => (
                <div
                    key={n}
                    className={`sound-chip-wrap ${playing === n ? "playing" : ""}`}
                    style={{ ["--chip" as string]: COLORS[i % COLORS.length] }}
                    onClick={() => onPlay(n)}
                >
                    <ResourceChip
                        className="sound-chip"
                        locked={locked}
                        payload={{ groupId: "sound", value: n }}
                    />
                </div>
            ))}
        </div>
    );
}