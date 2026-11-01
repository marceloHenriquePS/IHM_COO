import data from "./modules.json"

export const MODULES: Module[] = data as Module[];

export type Step =
    | (BaseStep & { type: "build-object"; content: BuildObjectContent })
    | (BaseStep & { type: "analyse-object"; content: AnalyseObjectContent })
    | (BaseStep & { type: "classify-attributes"; content: ClassifyAttributesContent })
    | (BaseStep & { type: "sequence-methods"; content: SequenceMethodsContent })
    | (BaseStep & { type: "order-methods"; content: OrderMethodsContent })
    | (BaseStep & { type: "order-queue"; content: OrderQueueContent })
    | (BaseStep & { type: "custom-order"; content: CustomOrderContent })
    | (BaseStep & { type: "inspect-vehicle"; content: InspectVehicleContent })
    | (BaseStep & { type: "repair-vehicle"; content: RepairVehicleContent })
    | (BaseStep & { type: "calculate-payment"; content: CalculatePaymentContent })
    | (BaseStep & { type: "find-unprotected"; content: FindUnprotectedContent })
    | (BaseStep & { type: "diagnose-cause"; content: DiagnoseCauseContent })
    | (BaseStep & { type: "sort-conveyor"; content: SortConveyorContent })
    | (BaseStep & { type: "product-requests"; content: ProductRequestsContent })
    | (BaseStep & { type: "accuse-suspect"; content: AccuseSuspectContent })
    | (BaseStep & { type: "find-repetitions"; content: FindRepetitionsContent })
    | (BaseStep & { type: "build-base-class"; content: BuildBaseClassContent })
    | (BaseStep & { type: "build-subclasses"; content: BuildSubclassesContent })
    | (BaseStep & { type: "match-pairs"; content: MatchPairsContent })
    | (BaseStep & { type: "build-hierarchy"; content: BuildHierarchyContent })

export type StepType = Step["type"]
export type OrderTone = "pending" | "preparing" | "ready" | "served";
export type ClassTone = "blue" | "red" | "green" | "yellow";
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

export interface CustomOrderContent {
    customer: string;
    speech: string;
    maxItems: number;
    addLabel: string;
    extraLabel: string;
    order: {
        number: string;
        details: { id: string; label: string; value: string }[];
    };
    products: { id: string; name: string; image: string }[];
    extras: { id: string; name: string; image: string }[];
    answer: Record<string, number>;
    finalizeLabel: string;
    messages: { incomplete: string; wrong: string; success: string; full: string };
}

export interface InspectVehicleContent {
    vehicle: {
        number: string;
        image: string;
        checks: { id: string; label: string; value: boolean }[];
    };
    answer: boolean;
    diagnoseLabel: string;
    messages: { incomplete: string; wrong: string; success: string; full: string };
}

export interface RepairVehicleContent {
    vehicle: { number: string; image: string };
    sheetTitle: string;
    prompt: string;
    runLabel: string;
    tasks: { id: string; label: string; method: string; needed: boolean }[];
    methods: string[];
    messages: {
        incomplete: string;
        unnecessary: string;
        alreadyDone: string;
        progress: string;
        success: string;
    };
}

export interface CalculatePaymentContent {
    vehicle: { number: string; image: string };
    sheetTitle: string;
    priceTitle: string;
    priceImage: string;
    method: string;
    submitLabel: string;
    tasks: { id: string; label: string; needed: boolean; price: number }[];
    messages: { incomplete: string; invalid: string; wrong: string; success: string };
}

export interface FindUnprotectedContent {
    className: string;
    hint: string;
    unprotectedId: string;
    attributes: {
        id: string;
        label: string;
        type: string;
        icon: string;
        value: string;
    }[];
    selectLabel: string;
    valueLabel: string;
    submitLabel: string;
    access?: AccessConfig;
    messages: { incomplete: string; invalid: string; blocked: string; notAllProtected?: string; stillOpen?: string, success: string; };
}

export interface DiagnoseCauseContent {
    reportTitle: string;
    question: string;
    options: string[];
    answer: number;
    submitLabel: string;
    messages: { incomplete: string; wrong: string; success: string };
}

export interface SortConveyorContent {
    rules: { title: string; intro: string; items: string[] };
    compartments: { id: string; label: string; icon: string }[];
    attributes: { id: string; label: string; answer: string }[];
    rulesLabel: string;
    runLabel: string;
    messages: { queueEmpty: string; wrong: string; success: string };
}

export interface ProductRequestsContent {
    employeeImage: string;
    playerImage: string;
    employeeLabel: string;
    playerLabel: string;
    tableTitle: string;
    columns: { id: string; label: string }[];
    products: ({ id: string } & Record<string, string>)[];
    actions: { id: "get" | "set"; title: string; call: string; icon: string }[];
    requests: {
        id: string;
        text: string;
        method: "get" | "set";
        productId: string;
        attributeId: string;
        value: string;
        reply: string;
    }[];
    labels: { getPrompt: string; setPrompt: string; productPrompt: string; confirm: string };
    messages: {
        wrongMethod: Record<"get" | "set", string>;
        emptyAnswer: string;
        wrongAnswer: string;
        emptyValue: string;
        wrongProduct: string;
        wrongAttribute: string;
        wrongValue: string;
        success: string;
    };
}

export interface AccuseSuspectContent {
    dossierTitle: string;
    clues: string[];
    question: string;
    suspects: { id: string; name: string; role: string; image: string }[];
    answer: string;
    submitLabel: string;
    messages: {
        incomplete: string;
        wrong: string;
        wrongBySuspect?: Record<string, string>;
        success: string;
    };
}

export interface FindRepetitionsContent {
    classes: {
        id: string;
        name: string;
        tone: ClassTone;
        attributes: { type: string; name: string }[];
    }[];
    answer: string[];
    reportTitle: string;
    sendLabel: string;
    inputPlaceholder: string;
    registerLabel: string;
    messages: {
        emptyInput: string;
        duplicate: string;
        notFound: string;
        incomplete: string;
        missing: string;
        extra: string;
        success: string;
    };
}

export interface BuildBaseClassContent {
    className: string;
    attributeTitle: string;
    typeTitle: string;
    answer: { attribute: string; type: string }[];
    attributes: string[];
    types: string[];
    submitLabel: string;
    messages: { incomplete: string; wrong: string; success: string };
}

export interface BuildSubclassesContent {
    parent: { name: string; attributes: string[] };
    children: { id: string; name: string; tone: ClassTone; answer: string[] }[];
    attributes: { label: string; type: string; field: string }[];
    submitLabel: string;
    messages: {
        incomplete: string;
        duplicate: string;
        inherited: string;
        wrong: string;
        missing: string;
        success: string;
    };
}

export interface MatchPairsContent {
    leftItems: { id: string; label: string }[];
    rightItems: { id: string; label: string }[];
    answer: Record<string, string>;
    classCard: { name: string; attributes: string[]; method: string };
    rulesLabel: string;
    validateLabel: string;
    rules: {
        title: string;
        intro: string;
        inherits: string[];
        jobs: { id: string; text: string }[];
    };
    jobLabel?: string;
    messages: { incomplete: string; wrong: string; success: string };
}

export interface BuildHierarchyContent {
    tree: HierarchyNode;
    chips: string[];
    submitLabel: string;
    messages: {
        incomplete: string;
        needParent: string;
        wrong: string;
        success: string;
        poolEmpty: string;
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

export interface AccessConfig {
    title: string;
    options: { id: string; label: string }[];
    initial: string;
    requiredId: string;
}

export interface HierarchyNode {
    id: string;
    label: string;
    children?: HierarchyNode[];
}

export function getModuleById(id: number): Module | undefined {
    return MODULES.find((module) => module.id === id);
};

export function getPhase(moduleId: number, phaseId: number): Phase | undefined {
    return getModuleById(moduleId)?.phases.find((phase) => phase.id === phaseId);
};