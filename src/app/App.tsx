import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { startMusic } from "@/shared/audio/music";

export function App() {
    useEffect(() => {
        const events = ["pointerdown", "keydown"] as const;
        const start = () => {
            startMusic();
            events.forEach((e) => window.removeEventListener(e, start));
        };
        events.forEach((e) => window.addEventListener(e, start));
        return () => events.forEach((e) => window.removeEventListener(e, start));
    }, []);

    return <RouterProvider router={router} />;
}

export default App;