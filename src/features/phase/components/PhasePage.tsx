import { Navigate, useParams } from "react-router-dom";
import { getPhase } from "@/shared/data/modules";
import { PhaseHeader } from "./PhaseHeader/PhaseHeader";
import { useProgress } from "@/shared/hooks/useProgress";
import { PHASE_TYPES } from "../phaseTypes";
import "./PhasePage.css"
import { useFeedback } from "../hooks/useFeedback";
import { FeedbackMessage } from "./FeedbackMessage/FeedbackMessage";


export function PhasePage() {
    const { moduleId, phaseId } = useParams();
    const { isPhaseUnlocked } = useProgress();
    const { feedback, showFeedback, clearFeedback } = useFeedback();

    const phase = getPhase(Number(moduleId), Number(phaseId));

    if (!phase || !isPhaseUnlocked(Number(moduleId), Number(phaseId))) {
        return <Navigate to={`/modules/${moduleId}`} replace />
    }

    const Screen = PHASE_TYPES[phase.type];

    return (
        <main className="phase-page">
            <div className="phase-intro">
                <PhaseHeader heading={phase.title} instructions={phase.instructions} />
                <FeedbackMessage feedback={feedback}/>
            </div>

            <Screen 
                key={`${moduleId}-${phaseId}`} 
                phase={phase}
                showFeedback={showFeedback}
                clearFeedback={clearFeedback}
            />
        </main>
    );
}
