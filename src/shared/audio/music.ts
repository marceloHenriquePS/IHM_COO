import { useSyncExternalStore } from "react";
import music1 from "@/shared/assets/audio/music1.mp3";
import music2 from "@/shared/assets/audio/music2.mp3";
import music3 from "@/shared/assets/audio/music3.mp3";
import music4 from "@/shared/assets/audio/music4.mp3";
import music5 from "@/shared/assets/audio/music5.mp3";

const TRACKS = [music1, music2, music3, music4, music5];
const STORAGE_KEY = "coo-muted";
const VOLUME = 0.35;
const VOLUME_DUCKED = 0.08;

function shuffleTracks<T>(tracks: T[]): T[] {
    const shuffled = [...tracks];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

function loadMuted(): boolean {
    try {
        return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
        return false;
    }
}

const tracks = shuffleTracks(TRACKS);
const listeners = new Set<() => void>();

let muted = loadMuted();
let index = 0;
let started = false;

const audio = new Audio(tracks[0]);
audio.volume = VOLUME;
audio.muted = muted;

function playTrack(i: number) {
    index = i % tracks.length;
    audio.src = tracks[index];
    audio.play().catch(() => { });
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