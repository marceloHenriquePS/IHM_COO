import type { ComponentType } from "react";
import type { Step, StepType} from "@/shared/data/modules";
import { BuildObject } from "./types/build-object/BuildObject";
import { AnalyseObject } from "./types/analyse-object/AnalyseObject";
import type { Feedback } from "./components/FeedbackMessage/FeedbackMessage";

export interface StepScreenProps {
    step: Step;
    locked: boolean;
    continueLabel: string;
    onComplete: () => void;
    onContinue: () => void;
    showFeedback: (f: Feedback) => void;
    clearFeedback: () => void;
}

export const STEP_TYPES: Record<StepType, ComponentType<StepScreenProps>> = {
    "build-object": BuildObject,
    "analyse-object": AnalyseObject,
};