import { useCallback, useEffect, useRef, useState } from "react";

export function useSoundPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const runId = useRef(0);
    const [playing, setPlaying] = useState<string | null>(null);
    const [sequence, setSequence] = useState(false);

    const stop = useCallback(() => {
        runId.current++;
        audioRef.current?.pause();
        audioRef.current = null;
        setPlaying(null);
        setSequence(false);
    }, []);

    const playOne = useCallback((number: string, src: string) => {
        return new Promise<void>((resolve) => {
            const audio = new Audio(src);
            audioRef.current = audio;
            setPlaying(number);
            audio.onended = () => resolve();
            audio.onerror = () => resolve();
            audio.play().catch(() => resolve());
        });
    }, []);

    const playSingle = useCallback(async (number: string, src: string) => {
        stop();
        const id = runId.current;
        await playOne(number, src);
        if (runId.current === id) setPlaying(null);
    }, [stop, playOne]);

    const playAll = useCallback(async (items: { number: string; src: string }[]) => {
        stop();
        const id = ++runId.current;
        setSequence(true);

        for (const item of items) {
            if (runId.current !== id) return;
            await playOne(item.number, item.src);
        }

        if (runId.current === id) {
            setPlaying(null);
            setSequence(false);
        }
    }, [stop, playOne]);

    useEffect(() => stop, [stop]);

    return { playing, sequence, playSingle, playAll, stop };
}