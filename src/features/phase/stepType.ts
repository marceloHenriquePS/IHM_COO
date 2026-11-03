import { lazy, type ComponentType } from "react";
import type { Step, StepType } from "@/shared/data/modules";
import type { Feedback } from "./components/FeedbackMessage/FeedbackMessage";

export interface StepScreenProps {
    step: Step;
    stepIndex: number;
    locked: boolean;
    continueLabel: string;
    onComplete: () => void;
    onContinue: () => void;
    showFeedback: (f: Feedback) => void;
    clearFeedback: () => void;
}

export const STEP_TYPES: Record<StepType, ComponentType<StepScreenProps>> = {
    "build-object": lazy(() =>
        import("./types/build-object/BuildObject").then((m) => ({ default: m.BuildObject }))
    ),
    "analyse-object": lazy(() =>
        import("./types/analyse-object/AnalyseObject").then((m) => ({ default: m.AnalyseObject }))
    ),
    "classify-attributes": lazy(() =>
        import("./types/classify-attributes/ClassifyAttributes").then((m) => ({ default: m.ClassifyAttributes }))
    ),
    "sequence-methods": lazy(() =>
        import("./types/sequence-methods/SequenceMethods").then((m) => ({ default: m.SequenceMethods }))
    ),
    "order-methods": lazy(() =>
        import("./types/order-methods/OrderMethods").then((m) => ({ default: m.OrderMethods }))
    ),
    "order-queue": lazy(() =>
        import("./types/order-queue/OrderQueue").then((m) => ({ default: m.OrderQueue }))
    ),
    "custom-order": lazy(() =>
        import("./types/custom-order/CustomOrder").then((m) => ({ default: m.CustomOrder }))
    ),
    "inspect-vehicle": lazy(() =>
        import("./types/inspect-vehicle/InspectVehicle").then((m) => ({ default: m.InspectVehicle }))
    ),
    "repair-vehicle": lazy(() =>
        import("./types/repair-vehicle/RepairVehicle").then((m) => ({ default: m.RepairVehicle }))
    ),
    "calculate-payment": lazy(() =>
        import("./types/calculate-payment/CalculatePayment").then((m) => ({ default: m.CalculatePayment }))
    ),
    "find-unprotected": lazy(() =>
        import("./types/find-unprotected/FindUnprotected").then((m) => ({ default: m.FindUnprotected }))
    ),
    "diagnose-cause": lazy(() =>
        import("./types/diagnose-cause/DiagnoseCause").then((m) => ({ default: m.DiagnoseCause }))
    ),
    "sort-conveyor": lazy(() =>
        import("./types/sort-conveyor/SortConveyor").then((m) => ({ default: m.SortConveyor }))
    ),
    "product-requests": lazy(() =>
        import("./types/product-request/ProductRequests").then((m) => ({ default: m.ProductRequests }))
    ),
    "accuse-suspect": lazy(() =>
        import("./types/accuse-suspect/AccuseSuspect").then((m) => ({ default: m.AccuseSuspect }))
    ),
    "find-repetitions": lazy(() =>
        import("./types/find-repetitions/FindRepetitions").then((m) => ({ default: m.FindRepetitions }))
    ),
    "build-base-class": lazy(() =>
        import("./types/build-base-class/BuildBaseClass").then((m) => ({ default: m.BuildBaseClass }))
    ),
    "build-subclasses": lazy(() =>
        import("./types/build-subclasses/BuildSubclasses").then((m) => ({ default: m.BuildSubclasses }))
    ),
    "match-pairs": lazy(() =>
        import("./types/match-pairs/MatchPairs").then((m) => ({ default: m.MatchPairs }))
    ),
    "build-hierarchy": lazy(() =>
        import("./types/build-hierarchy/BuildHierarchy").then((m) => ({ default: m.BuildHierarchy }))
    ),
    "match-sounds": lazy(() =>
        import("./types/match-sounds/MatchSounds").then((m) => ({ default: m.MatchSounds }))
    ),
    "fill-blanks": lazy(() =>
        import("./types/fill-blanks/FillBlanks").then((m) => ({ default: m.FillBlanks }))
    ),
    "choose-animal": lazy(() =>
        import("./types/choose-animal/ChooseAnimal").then((m) => ({ default: m.ChooseAnimal }))
    ),
    "feed-animal": lazy(() =>
        import("./types/feed-animal/FeedAnimal").then((m) => ({ default: m.FeedAnimal }))
    ),
    "sort-animals": lazy(() =>
        import("./types/sort-animals/SortAnimals").then((m) => ({ default: m.SortAnimals }))
    ),
};
