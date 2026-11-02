import { useSyncExternalStore } from "react";
import { MODULES, getModuleById } from "@/shared/data/modules";

interface Progress {
    moduleId: number;
    phaseId: number;
}

const STORAGE_KEY = "coo-progress";
const INITIAL: Progress = { moduleId: 5, phaseId: 5 };

function load(): Progress {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? { ...INITIAL, ...JSON.parse(raw) } : INITIAL;
    } catch {
        return INITIAL;
    }
}

let current: Progress = load();
const listeners = new Set<() => void>();

function setProgress(next: Progress) {
    current = next;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
        //
    }
    listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

const getSnapshot = () => current;

export function useProgress() {
    const progress = useSyncExternalStore(subscribe, getSnapshot);

    function isModuleUnlocked(moduleId: number) {
        return moduleId <= progress.moduleId;
    }

    function isPhaseUnlocked(moduleId: number, phaseId: number) {
        if (moduleId < progress.moduleId) return true;
        if (moduleId === progress.moduleId) return phaseId <= progress.phaseId;
        return false;
    }

    function completePhase(moduleId: number, phaseId: number) {
        if (moduleId !== current.moduleId || phaseId !== current.phaseId) return;

        const phases = getModuleById(moduleId)?.phases ?? [];

        if (phaseId < phases.length) {
            setProgress({ moduleId, phaseId: phaseId + 1 });
            return;
        }

        const nextModule = MODULES.find((m) => m.id === moduleId + 1);
        if (nextModule) {
            setProgress({ moduleId: nextModule.id, phaseId: 1 });
        }
    }

    function resetProgress() {
        setProgress(INITIAL);
    }

    return { progress, isModuleUnlocked, isPhaseUnlocked, completePhase, resetProgress };
}