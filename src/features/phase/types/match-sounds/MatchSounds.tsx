import { useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { renderRichText } from "@/shared/utils/richText";
import { IMAGES } from "./images";
import { AUDIOS } from "./audios";
import { useSoundPlayer } from "./useSoundPlayer";
import { AnimalRow } from "./components/AnimalRow/AnimalRow";
import { SoundBar } from "./components/SoundBar/SoundBar";
import "./MatchSounds.css";
import { OptionBar } from "./components/OptionBar/OptionBar";

export function MatchSounds({ step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback }: StepScreenProps) {
    const [values, setValues] = useState<Record<string, string | null>>(() =>
        step.type === "match-sounds"
            ? Object.fromEntries(step.content.animals.map((a) => [a.id, null]))
            : {}
    );
    const [wrongIds, setWrongIds] = useState<string[]>([]);
    const player = useSoundPlayer();

    if (step.type !== "match-sounds") return null;
    const { content } = step;

    const srcOf = (number: string) => {
        const sound = content.sounds?.find((s) => s.number === number);
        return sound ? AUDIOS[sound.audio] : "";
    };

    const hasSounds = Boolean(content.sounds && content.sounds.length > 0);

    function handleDrop(animalId: string, number: string) {
        setValues((prev) => {
            const next = { ...prev };
            Object.keys(next).forEach((id) => {
                if (next[id] === number) next[id] = null;
            });
            next[animalId] = number;
            return next;
        });
        setWrongIds([]);
        clearFeedback();
    }

    function handleClear(animalId: string) {
        setValues((prev) => ({ ...prev, [animalId]: null }));
        setWrongIds([]);
        clearFeedback();
    }

    function handleValidate() {
        if (locked) {
            player.stop();
            onContinue();
            return;
        }

        if (content.animals.some((a) => !values[a.id])) {
            setWrongIds([]);
            showFeedback({ type: "warning", text: content.messages.incomplete });
            return;
        }

        const wrong = content.animals
            .filter((a) => values[a.id] !== content.answer[a.id])
            .map((a) => a.id);

        if (wrong.length > 0) {
            setWrongIds(wrong);
            showFeedback({ type: "error", text: content.messages.wrong });
            return;
        }

        setWrongIds([]);
        player.stop();
        showFeedback({ type: "success", text: content.messages.success });
        onComplete();
    }

    return (
        <div className="match-sounds">
            <AnimalRow
                animals={content.animals.map((a) => ({ ...a, image: IMAGES[a.image] }))}
                values={values}
                wrongIds={wrongIds}
                locked={locked}
                onDropSound={handleDrop}
                onClear={handleClear}
            />

            <p className="match-sounds-prompt">{renderRichText(content.prompt)}</p>

            <ResourceCenter icon={ICONS.box} className="sounds-center">
                <div className="sounds-center-body">
                    {hasSounds ? (
                        <SoundBar
                            numbers={content.sounds!.map((s) => s.number)}
                            playing={player.playing}
                            locked={locked}
                            onPlay={(n) => player.playSingle(n, srcOf(n))}
                        />
                    ) : (
                        <OptionBar options={content.options ?? []} locked={locked} />
                    )}

                    <div className="sounds-center-buttons">
                        <button type="button" onClick={handleValidate}>
                            {locked ? continueLabel : content.validateLabel}
                        </button>
                    </div>
                </div>
            </ResourceCenter>
        </div>
    );
}