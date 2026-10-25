import data from "./modules.json"

export const MODULES: Module[] = data as Module[];
export type PhaseType = "build-object" | "analyse-object";
export type Phase = 
    | (BasePhase & {type: "build-object"; content: BuildObjectContent})
    | (BasePhase & {type: "analyse-object"; content: AnalyseObjectContent})

export interface Module {
    id: number;
    title: string;
    subtitle: string;
    phases: Phase[];
}

export interface BasePhase {
    id: number;
    title: string;
    description: string;
    instructions: string;}

export interface BuildObjectContent {
    className: string;
    submitLabel: string;
    submitIcon?: string;
    resourceIcon?:string;
    fields: { id: string; label: string; icon: string; expected: string }[];
    groups: { id: string; label: string; icon: string; options: string[] }[];
    messages: {incomplete: string, wrong: string, success: string};
}

export interface AnalyseObjectContent {
    requirements: string[]
    submitLabel: string;
    submitIcon?: string;
    resourceIcon?:string;
    maxSelected: number;
    answer: string[]
    fields: { id: keyof Candidate; label: string; icon: string }[];
    candidates: Candidate[];
    messages: {incomplete: string, wrong: string, success: string};
}

export interface Candidate {
    id: string;
    photo: string;
    name: string;
    age: string;
    sector: string;
    role: string;
    salary: string;
}

export function getModuleById(id: number): Module | undefined {
    return MODULES.find((module) => module.id === id);
};

export function getPhase(moduleId: number, phaseId: number): Phase | undefined {
    return getModuleById(moduleId)?.phases.find((phase) => phase.id === phaseId);
};