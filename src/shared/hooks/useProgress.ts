export function useProgress() {
    const progress = {moduleId: 1, phaseId: 3};

    function isModuleUnlocked(moduleId: number) {
        return moduleId <= progress.moduleId;
    }

    function isPhaseUnlocked(moduleId:number, phaseId:number) {
        if (moduleId < progress.moduleId) {
            return true;
        }

        if (moduleId === progress.moduleId) {
            if (phaseId <= progress.phaseId) {
                return true;
            }
        }

        return false;
    }

    return {progress, isModuleUnlocked, isPhaseUnlocked};
};