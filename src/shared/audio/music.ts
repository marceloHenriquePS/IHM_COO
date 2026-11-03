import { useSyncExternalStore } from "react";
import music1 from "@/shared/assets/audio/music1.mp3";
import music2 from "@/shared/assets/audio/music2.mp3";
import music3 from "@/shared/assets/audio/music3.mp3";

const TRACKS = [music1, music2, music3];
const STORAGE_KEY = "coo-muted";
const VOLUME = 0.35;
const VOLUME_DUCKED = 0.08;

function loadMuted(): boolean {
    try {
        return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
        return false;
    }
}

let muted = loadMuted();
let index = 0;
let started = false;
const listeners = new Set<() => void>();

const audio = new Audio(TRACKS[0]);
audio.volume = VOLUME;
audio.muted = muted;

function playTrack(i: number) {
    index = i % TRACKS.length;
    audio.src = TRACKS[index];
    audio.play().catch(() => {});
}

audio.addEventListener("ended", () => playTrack(index + 1));
audio.addEventListener("error", () => playTrack(index + 1));

export function startMusic() {
    if (started) return;
    started = true;
    audio.play().catch(() => {
        started = false;
    });
}

export function setMuted(next: boolean) {
    muted = next;
    audio.muted = next;
    try {
        localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
        //
    }
    listeners.forEach((l) => l());
}

export function duckMusic(on: boolean) {
    audio.volume = on ? VOLUME_DUCKED : VOLUME;
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function useMusic() {
    const isMuted = useSyncExternalStore(subscribe, () => muted);
    return { muted: isMuted, toggleMute: () => setMuted(!muted) };
}