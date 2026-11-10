import { useSyncExternalStore } from "react";
import { MODULES, getModuleById } from "@/shared/data/modules";

interface Progress {
    moduleId: number;
    phaseId: number;
    completed: boolean;
}

const STORAGE_KEY = "coo-progress";
const INITIAL: Progress = { moduleId: 1, phaseId: 1, completed: false };

function load(): Progress {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? { ...INITIAL, ...JSON.parse(raw) } : INITIAL;
    } catch {
        return INITIAL;
    }
}

let testMode = false;
let current: Progress = load();
const listeners = new Set<() => void>();

function toggleTestMode() {
    testMode = !testMode;
    listeners.forEach((listener) => listener())
}

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
const getTestModeSnapshot = () => testMode;

export function useProgress() {
    const isTestMode = useSyncExternalStore(subscribe, getTestModeSnapshot);
    const progress = useSyncExternalStore(subscribe, getSnapshot);

    function isModuleUnlocked(moduleId: number) {
        if (isTestMode) return true;
        return moduleId <= progress.moduleId;
    }

    function isPhaseUnlocked(moduleId: number, phaseId: number) {
        if (isTestMode) return true;

        if (progress.completed) return true;
        if (moduleId < progress.moduleId) return true;
        if (moduleId === progress.moduleId) return phaseId <= progress.phaseId;

        return false;
    }

    function completePhase(moduleId: number, phaseId: number) {
        if (isTestMode) return;
        if (current.completed) return;
        if (moduleId !== current.moduleId || phaseId !== current.phaseId) return;

        const phases = getModuleById(moduleId)?.phases ?? [];

        if (phaseId < phases.length) {
            setProgress({...current, phaseId: phaseId + 1,});
            return;
        }

        const nextModule = MODULES.find((m) => m.id === moduleId + 1);
        if (nextModule) {
            setProgress({...current, moduleId: nextModule.id, phaseId: 1 }); 
            return;
        }
        setProgress({...current, completed: true,});
    }

    function resetProgress() {
        if (isTestMode) return;
        setProgress(INITIAL);
    }

    return { progress, isModuleUnlocked, isPhaseUnlocked, completePhase, resetProgress, testMode: isTestMode, toggleTestMode };
}