import type { ReactNode } from "react";
import "./ResourceCenter.css";
import { ICONS } from "../../icons";

interface ResourceCenterProps {
    icon?: string;
    children: ReactNode;
    className?: string;
}

export function ResourceCenter({ children, className = "" }: ResourceCenterProps) {
    const icon = ICONS.box;

    return (
        <section className={`resource-center ${className}`}>
            <header className="resource-center-header">
                {icon && <img src={icon} alt="" className="resource-center-icon" />}
                <h2>CENTRAL DE RECURSOS</h2>
            </header>

            <div className="resource-center-body">{children}</div>
        </section>
    );
}