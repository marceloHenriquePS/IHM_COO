import "./Conveyor.css";

interface ConveyorProps {
    item: string | null;
    remaining: number;
    leaving?: "left" | "right" | null;
}

export function Conveyor({ item, remaining, leaving }: ConveyorProps) {
    return (
        <div className="conveyor" role="status" aria-label={`Esteira: ${remaining} atributos restantes`}>
            {item && (
                <span key={item} className={`conveyor-item ${leaving ? `leaving-${leaving}` : ""}`}>
                    {item}
                </span>
            )}
        </div>
    );
}