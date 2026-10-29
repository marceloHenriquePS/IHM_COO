import data from "./modules.json"

export const MODULES: Module[] = data as Module[];

export type Step =
    | (BaseStep & { type: "build-object"; content: BuildObjectContent })
    | (BaseStep & { type: "analyse-object"; content: AnalyseObjectContent })
    | (BaseStep & { type: "classify-attributes"; content: ClassifyAttributesContent })
    | (BaseStep & { type: "sequence-methods"; content: SequenceMethodsContent })
    | (BaseStep & { type: "order-methods"; content: OrderMethodsContent })
    | (BaseStep & { type: "order-queue"; content: OrderQueueContent });

export type StepType = Step["type"]
export type OrderTone = "pending" | "preparing" | "ready" | "served";
export interface Module {
    id: number;
    title: string;
    subtitle: string;
    phases: Phase[];
}

export interface Phase {
    id: number;
    title: string;
    description: string;
    steps: Step[];
}

export interface BaseStep {
    instructions: string | string[];
}

export interface BuildObjectContent {
    className: string;
    submitLabel: string;
    submitIcon?: string;
    fields: { id: string; label: string; icon: string; expected: string }[];
    groups: { id: string; label: string; icon: string; options: string[] }[];
    messages: { incomplete: string, wrong: string, success: string };
}

export interface AnalyseObjectContent {
    submitLabel: string;
    submitIcon?: string;
    maxSelected: number;
    answer: string[]
    fields: { id: keyof Candidate; label: string; icon: string }[];
    candidates: Candidate[];
    messages: { incomplete: string, wrong: string, success: string };
}

export interface ClassifyAttributesContent {
    className: string;
    submitLabel: string;
    submitIcon?: string;
    attributes: { id: string; label: string; icon: string; value: string; expected: string }[];
    types: string[];
    messages: { incomplete: string; wrong: string; success: string };
}

export interface SequenceMethodsContent {
    image: string;
    initialStatus: string;
    slots: number;
    methods: { name: string; status: string }[];
    answer: string[];
    undoLabel: string;
    runLabel: string;
    messages: { incomplete: string; wrong: string; success: string };
}

export interface OrderMethodsContent {
    question: string;
    order: OrderData;
    actions: { id: "prepare" | "serve"; title: string; call: string; icon: string }[];
    states: Record<"preparing" | "ready" | "served", {
        badge: { label: string; tone: OrderTone };
        status: string;
    }>;
    messages: { preparing: string; notReady: string; alreadyPrepared: string; success: string; };
}

export interface OrderQueueContent {
    orders: OrderData[];
    actions: { id: "prepare" | "serve"; title: string; call: string; icon: string }[];
    states: Record<OrderTone, { badge: { label: string; tone: OrderTone }; status: string }>;
    messages: {
        noSelection: string;
        preparing: string;
        notReady: string;
        alreadyPrepared: string;
        alreadyServed: string;
        served: string;
        success: string;
    };
}

export interface OrderData {
    id: string;
    item: string;
    image: string;
    phase: OrderTone;
    badge: { label: string; tone: OrderTone };
    details: { id: string; label: string; value: string }[];
}

export interface Candidate {
    id: string;
    photo: string;
    [key: string]: string;
}

export function getModuleById(id: number): Module | undefined {
    return MODULES.find((module) => module.id === id);
};

export function getPhase(moduleId: number, phaseId: number): Phase | undefined {
    return getModuleById(moduleId)?.phases.find((phase) => phase.id === phaseId);
};