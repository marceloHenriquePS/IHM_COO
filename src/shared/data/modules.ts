import data from "./modules.json"

export const MODULES: Module[] = data as Module[];

export type Step =
    | (BaseStep & { type: "build-object"; content: BuildObjectContent })
    | (BaseStep & { type: "analyse-object"; content: AnalyseObjectContent })
    | (BaseStep & { type: "classify-attributes"; content: ClassifyAttributesContent});

export type StepType = Step["type"]

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