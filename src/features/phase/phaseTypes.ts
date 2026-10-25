import type { ComponentType } from "react";
import type { Phase, PhaseType } from "@/shared/data/modules";
import { BuildObject } from "./types/build-object/BuildObject";
import { AnalyseObject } from "./types/analyse-object/AnalyseObject";
import type { Feedback } from "./components/FeedbackMessage/FeedbackMessage";

export interface PhaseScreenProps {
    phase: Phase;
    showFeedback: (feedback: Feedback) => void;
    clearFeedback: () => void;
}

export const PHASE_TYPES: Record<PhaseType, {
    Screen: ComponentType<PhaseScreenProps>;
    showHeader: boolean;
}> = {
    "build-object": { Screen: BuildObject, showHeader: true },
    "analyse-object": { Screen: AnalyseObject, showHeader: true },
};