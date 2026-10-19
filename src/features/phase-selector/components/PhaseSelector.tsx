import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useProgress } from '@/shared/hooks/useProgress';
import { getModuleById } from '@/shared/data/modules';
import { PhaseTrack } from './PhaseTrack/PhaseTrack';
import { useState } from 'react';
import './PhaseSelector.css';

export function PhaseSelector() {
    const navigate = useNavigate();
    const { moduleId } = useParams();
    const { isModuleUnlocked, isPhaseUnlocked } = useProgress();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const moduleData = getModuleById(Number(moduleId));

    if (!moduleData || !isModuleUnlocked(moduleData.id)) {
        return <Navigate to="/home" replace />
    }

    const selectedPhase = moduleData.phases.find((phase) => phase.id === selectedId) ?? moduleData.phases[0];

    return (
        <main className='phase-selector'>
            <h1 className="phase-selector-title">
                {moduleData.title.toUpperCase()} - {moduleData.subtitle}
            </h1>

            <h2 className="phase-selector-phase-title">
                {selectedPhase.title}
            </h2>

            <PhaseTrack
                phases={moduleData.phases}
                isUnlocked={(phaseId) => isPhaseUnlocked(moduleData.id, phaseId)}
                selectedPhaseId={selectedPhase.id}
                onSelect={setSelectedId}
            />

            <p className="phase-selector-description">{selectedPhase.description}</p>

            <button
                className="phase-selector-play"
                type="button"
                onClick={() => console.log("Apertou botão jogar")}
            >
            JOGAR
            </button>
        </main>

    );
}