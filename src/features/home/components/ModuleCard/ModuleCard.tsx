import "./ModuleCard.css";
import type { Module } from "../../../../shared/data/modules";
import lockIcon from "@/features/home/assets/lock.png"

interface ModuleCardProps {
  module: Module;
  unlocked: boolean;
  onStart?: (moduleId: number) => void;
}

export function ModuleCard({ module, unlocked, onStart }: ModuleCardProps) {
  const { id, title, subtitle } = module;

  return (
    <div className={`module-card ${unlocked ? "unlocked" : "locked"}`}>
      <div className="module-card-box">
        <div className="module-card-icon">
          {!unlocked && (
            <img src={lockIcon} alt="Fase Bloqueada" className="module-card-lock" />
          )}
        </div>

        <div className="module-card-text">
          <span><b>{title}</b></span>
          <span>{subtitle}</span>
        </div>
      </div>

      <button
        className="module-card-button"
        type="button"
        disabled={!unlocked}
        onClick={() => onStart?.(id)}
      >
        INICIAR
      </button>
    </div>
  );
}