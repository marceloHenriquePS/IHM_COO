import "./LearningJourney.css";
import { MODULES } from "@/shared/data/modules";
import { ModuleCard } from "../ModuleCard/ModuleCard";
import { useProgress } from "@/shared/hooks/useProgress";
import { useNavigate } from "react-router-dom";

export function LearningJourney() {
  const {isModuleUnlocked} = useProgress();
  const navigate = useNavigate();

  return (
    <section className="learning-journey">
      <h2>SUA JORNADA DE APRENDIZADO</h2>

      <div className="learning-journey-track">
        {MODULES.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            unlocked={isModuleUnlocked(module.id)}
            onStart={(id) => navigate(`/modules/${id}`)}
          />
        ))}
      </div>
    </section>
  );
}