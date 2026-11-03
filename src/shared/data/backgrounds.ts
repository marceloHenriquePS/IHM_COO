import bg01 from "@/shared/assets/backgrounds/background-city-1.png";
import bg02 from "@/shared/assets/backgrounds/background-city-2.png";
import bg03 from "@/shared/assets/backgrounds/background-city-3.png";
import bg04 from "@/shared/assets/backgrounds/background-city-4.png";
import bg05 from "@/shared/assets/backgrounds/background-city-5.png";
import bg06 from "@/shared/assets/backgrounds/background-city-6.png";
import bg07 from "@/shared/assets/backgrounds/background-city-7.png";
import bg08 from "@/shared/assets/backgrounds/background-city-8.png";
import bg09 from "@/shared/assets/backgrounds/background-city-9.png";
import bg10 from "@/shared/assets/backgrounds/background-city-10.png";
import bg11 from "@/shared/assets/backgrounds/background-city-11.png";
import bg12 from "@/shared/assets/backgrounds/background-city-12.png";
import bg13 from "@/shared/assets/backgrounds/background-city-13.png";

import { positionOf } from "./modules";

export interface BackgroundMilestone {
    moduleId: number;
    phaseId: number;
    image: string;
    completed?: boolean;

}

export const BACKGROUNDS: BackgroundMilestone[] = [
    { moduleId: 1, phaseId: 1, image: bg01 },
    { moduleId: 1, phaseId: 2, image: bg02 },
    { moduleId: 1, phaseId: 4, image: bg03 },
    { moduleId: 2, phaseId: 1, image: bg04 },
    { moduleId: 2, phaseId: 4, image: bg05 },
    { moduleId: 3, phaseId: 1, image: bg06 },
    { moduleId: 3, phaseId: 2, image: bg07 },
    { moduleId: 3, phaseId: 4, image: bg08 },
    { moduleId: 4, phaseId: 1, image: bg09 },
    { moduleId: 4, phaseId: 4, image: bg10 },
    { moduleId: 5, phaseId: 1, image: bg11 },
    { moduleId: 5, phaseId: 3, image: bg12 },
    { moduleId: 5, phaseId: 5, image: bg13, completed: true },
];

export function getBackground(progress: { moduleId: number; phaseId: number; completed?: boolean }): string {
    const current = positionOf(progress.moduleId, progress.phaseId);

    const sorted = [...BACKGROUNDS].sort(
        (a, b) => positionOf(a.moduleId, a.phaseId) - positionOf(b.moduleId, b.phaseId)
    );

    let chosen = sorted[0];
    for (const m of sorted) {
        if (m.completed && !progress.completed) continue;

        if (positionOf(m.moduleId, m.phaseId) <= current) chosen = m;
    }
    return chosen.image;
}