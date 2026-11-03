// PhasePage.tsx
import { useState } from "react";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getPhase } from "@/shared/data/modules";
import { useProgress } from "@/shared/hooks/useProgress";
import { STEP_TYPES } from "../stepType";
import { useFeedback } from "../hooks/useFeedback";
import { PhaseHeader } from "./PhaseHeader/PhaseHeader";
import { FeedbackMessage } from "./FeedbackMessage/FeedbackMessage";
import type { Phase } from "@/shared/data/modules";
import "./PhasePage.css";

interface PhaseStepProps {
    moduleId: number;
    phase: Phase;
    stepIndex: number;
}

export function PhasePage() {
    const [searchParams] = useSearchParams();
    const { moduleId, phaseId } = useParams();
    const { isPhaseUnlocked } = useProgress();

    const phase = getPhase(Number(moduleId), Number(phaseId));
    const stepIndex = Math.max(0, Number(searchParams.get("step") ?? 0) || 0);

    if (!phase || !isPhaseUnlocked(Number(moduleId), Number(phaseId))) {
        return <Navigate to={`/modules/${moduleId}`} replace />;
    }

    if (!phase.steps[stepIndex]) {
        return <Navigate to={`/modules/${moduleId}`} replace />;
    }

    return (
        <PhaseStep
            key={`${moduleId}-${phaseId}-${stepIndex}`}
            moduleId={Number(moduleId)}
            phase={phase}
            stepIndex={stepIndex}
        />
    );
}

function PhaseStep({ moduleId, phase, stepIndex }: PhaseStepProps) {
    const navigate = useNavigate();
    const [done, setDone] = useState(false);
    const [, setSearchParams] = useSearchParams();
    const { feedback, showFeedback, clearFeedback } = useFeedback();
    const { completePhase } = useProgress();

    const step = phase.steps[stepIndex];
    const isLast = stepIndex === phase.steps.length - 1;
    const Screen = STEP_TYPES[step.type];

    function handleContinue() {
        if (isLast) {
            completePhase(moduleId, phase.id);
            navigate(`/home`);
            return;
        }
        setSearchParams({ step: String(stepIndex + 1) });
    }

    return (
        <main className="phase-page">
            <div className="phase-intro">
                <PhaseHeader heading={phase.title} instructions={step.instructions} />
                <FeedbackMessage feedback={feedback} />
            </div>

            <Screen
                step={step}
                stepIndex={stepIndex}
                locked={done}
                continueLabel={isLast ? "Confirmar": "Avançar"}
                onComplete={() => setDone(true)}
                onContinue={handleContinue}
                showFeedback={showFeedback}
                clearFeedback={clearFeedback}
            />
        </main>
    );
}