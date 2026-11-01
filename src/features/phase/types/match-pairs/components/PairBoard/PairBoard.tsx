import { useLayoutEffect, useRef, useState } from "react";
import "./PairBoard.css";

interface Item { id: string; label: string }

interface PairBoardProps {
    left: Item[];
    right: Item[];
    links: Record<string, string>;
    selectedLeft: string | null;
    wrongLeft?: string[];
    locked?: boolean;
    onSelectLeft: (id: string) => void;
    onSelectRight: (id: string) => void;
}

interface Line { id: string; x1: number; y1: number; x2: number; y2: number }

export function PairBoard({
    left, right, links, selectedLeft, wrongLeft = [], locked, onSelectLeft, onSelectRight,
}: PairBoardProps) {
    const boardRef = useRef<HTMLDivElement>(null);
    const leftRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const rightRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const [lines, setLines] = useState<Line[]>([]);

    useLayoutEffect(() => {
        function measure() {
            const board = boardRef.current;
            if (!board) return;
            const origin = board.getBoundingClientRect();

            const next: Line[] = [];
            Object.entries(links).forEach(([l, r]) => {
                const a = leftRefs.current[l]?.getBoundingClientRect();
                const b = rightRefs.current[r]?.getBoundingClientRect();
                if (!a || !b) return;
                next.push({
                    id: l,
                    x1: a.right - origin.left,
                    y1: a.top + a.height / 2 - origin.top,
                    x2: b.left - origin.left,
                    y2: b.top + b.height / 2 - origin.top,
                });
            });
            setLines(next);
        }

        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [links, left, right]);

    const linkedRight = new Set(Object.values(links));

    return (
        <div className="pair-board" ref={boardRef}>
            <ul className="pair-board-column">
                {left.map((item) => (
                    <li key={item.id}>
                        <button
                            type="button"
                            ref={(el) => { leftRefs.current[item.id] = el; }}
                            className={`pair-item ${selectedLeft === item.id ? "selected" : ""} ${links[item.id] ? "linked" : ""}`}
                            aria-pressed={selectedLeft === item.id}
                            disabled={locked}
                            onClick={() => onSelectLeft(item.id)}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>

            <ul className="pair-board-column">
                {right.map((item) => (
                    <li key={item.id}>
                        <button
                            type="button"
                            ref={(el) => { rightRefs.current[item.id] = el; }}
                            className={`pair-item ${linkedRight.has(item.id) ? "linked" : ""}`}
                            disabled={locked || selectedLeft === null}
                            onClick={() => onSelectRight(item.id)}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>

            <svg className="pair-board-lines" aria-hidden="true">
                {lines.map((ln) => (
                    <line
                        key={ln.id}
                        x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
                        className={wrongLeft.includes(ln.id) ? "wrong" : ""}
                    />
                ))}
            </svg>
        </div>
    );
}