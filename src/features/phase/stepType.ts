import type { ComponentType } from "react";
import type { Step, StepType } from "@/shared/data/modules";
import { BuildObject } from "./types/build-object/BuildObject";
import { AnalyseObject } from "./types/analyse-object/AnalyseObject";
import { ClassifyAttributes } from "./types/classify-attributes/ClassifyAttributes";
import { SequenceMethods } from "./types/sequence-methods/SequenceMethods";
import { OrderMethods } from "./types/order-methods/OrderMethods";
import { OrderQueue } from "./types/order-queue/OrderQueue";
import { CustomOrder } from "./types/custom-order/CustomOrder";
import { InspectVehicle } from "./types/inspect-vehicle/InspectVehicle";
import type { Feedback } from "./components/FeedbackMessage/FeedbackMessage";
import { RepairVehicle } from "./types/repair-vehicle/RepairVehicle";
import { CalculatePayment } from "./types/calculate-payment/CalculatePayment";
import { FindUnprotected } from "./types/find-unprotected/FindUnprotected";
import { DiagnoseCause } from "./types/diagnose-cause/DiagnoseCause";
import { SortConveyor } from "./types/sort-conveyor/SortConveyor";
import { ProductRequests } from "./types/product-request/ProductRequests";
import { AccuseSuspect } from "./types/accuse-suspect/AccuseSuspect";
import { FindRepetitions } from "./types/find-repetitions/FindRepetitions";
import { BuildBaseClass } from "./types/build-base-class/BuildBaseClass";
import { BuildSubclasses } from "./types/build-subclasses/BuildSubclasses";

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
    "build-object": BuildObject,
    "analyse-object": AnalyseObject,
    "classify-attributes": ClassifyAttributes,
    "sequence-methods": SequenceMethods,
    "order-methods": OrderMethods,
    "order-queue": OrderQueue,
    "custom-order": CustomOrder,
    "inspect-vehicle": InspectVehicle,
    "repair-vehicle": RepairVehicle,
    "calculate-payment": CalculatePayment,
    "find-unprotected": FindUnprotected,
    "diagnose-cause": DiagnoseCause,
    "sort-conveyor": SortConveyor,
    "product-requests": ProductRequests,
    "accuse-suspect": AccuseSuspect,
    "find-repetitions": FindRepetitions,
    "build-base-class": BuildBaseClass,
    "build-subclasses": BuildSubclasses,
};