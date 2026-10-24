import type { ComponentType } from "react";
import type { Phase, PhaseType } from "@/shared/data/modules";
import { BuildObject } from "./types/build-object/BuildObject";
import type { Feedback } from "./components/FeedbackMessage/FeedbackMessage";

export interface PhaseScreenProps {
    phase: Phase;
    showFeedback: (feedback: Feedback) => void;
    clearFeedback: () => void;
}

export const PHASE_TYPES: Record<PhaseType, ComponentType<PhaseScreenProps>> = {
    "build-object": BuildObject,
};