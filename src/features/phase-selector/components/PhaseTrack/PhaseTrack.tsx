import type { Phase } from "@/shared/data/modules"
import lockIcon from "@/features/phase-selector/assets/lock.png"
import barrierIcon from "@/features/phase-selector/assets/barrier.png"
import "./PhaseTrack.css"

interface PhaseTrackProps {
    phases: Phase[];
    selectedPhaseId:number;
    onSelect: (phaseId: number) => void;
    isUnlocked: (phaseId: number) => boolean;
}

export function PhaseTrack({phases, selectedPhaseId, isUnlocked, onSelect}: PhaseTrackProps) {
    const lastUnlockedIndex = phases.reduce((last, phase, i) => (isUnlocked(phase.id) ? i : last), -1);
    const hasBarrier = lastUnlockedIndex >= 0 && lastUnlockedIndex < phases.length - 1;

    return(
        <div className="phase-track">
            <div className="phase-track-road" />

            <div className="phase-track-items">
                {phases.map((phase, index) => {
                    const unlocked = isUnlocked(phase.id);
                    const selected = phase.id === selectedPhaseId;

                    return (
                        <div key={phase.id} className="phase-track-slot">
                        <div 
                            className={`phase-bubble ${unlocked ? "unlocked" : "locked"}`} 
                            title={phase.title}
                        >
                        <button
                            type="button"
                            className={`phase-bubble 
                                ${unlocked ? "unlocked" : "locked"}
                                ${selected ? "selected" : ""}
                            `}
                            disabled={!unlocked}
                            aria-pressed={selected}
                            aria-label={`Fase ${phase.id}: ${phase.title}`}
                            onClick={() => onSelect(phase.id)}
                        >
                            {!unlocked && (<img src={lockIcon} alt="" className="phase-bubble-lock" />)}
                            <span className="phase-bubble-number">{phase.id}</span>
                        </button>
                    </div>

                    {hasBarrier && index === lastUnlockedIndex && (
                        <img src={barrierIcon} alt="" className="phase-barrier" />
                    )}
                    </div>
                );
                })}
            </div>
        </div>
    );
}