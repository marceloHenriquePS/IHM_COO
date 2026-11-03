import { useProgress } from "@/shared/hooks/useProgress";
import { positionOf } from "@/shared/data/modules";
import { getBackground } from "@/shared/data/backgrounds";
import "./CityBanner.css";

export function CityBanner() {
    const { progress } = useProgress();
    const image = getBackground(progress);

    const TOTAL_PHASES = 25;
    const currentPosition = positionOf(progress.moduleId, progress.phaseId);

    const completedPhases = currentPosition - 1;

    const progressPercentage = progress.completed
        ? 100
        : Math.min(100, (completedPhases / TOTAL_PHASES) * 100);

    return (
        <section
            className="city-banner"
            style={{ "--city-background": `url("${image}")` } as React.CSSProperties}
        >
            <img
                src={image}
                alt="Ilustração da cidade"
                className="city-banner-image"
            />

            <div className="city-progress">
                <div className="city-progress-info">
                    <span>EVOLUÇÃO DA CIDADE</span>
                    <span>{Math.round(progressPercentage)}%</span>
                </div>

                <div
                    className="city-progress-track"
                    role="progressbar"
                    aria-label="Evolução da cidade"
                    aria-valuenow={Math.round(progressPercentage)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <div
                        className="city-progress-fill"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>
        </section>
    );
}