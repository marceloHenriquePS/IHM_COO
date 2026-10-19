import data from "./modules.json"

export const MODULES: Module[] = data as Module[];
export type PhaseType = "build-object";

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
    type: PhaseType;
}

export function getModuleById(id:number): Module | undefined {
    return MODULES.find((module) => module.id === id);
};

export function getPhase(moduleId:number, phaseId:number): Phase | undefined {
    return getModuleById(moduleId)?.phases.find((phase) => phase.id === phaseId);
};