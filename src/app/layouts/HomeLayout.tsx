import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "@/shared/components/Header/Header";
import { HelpModal } from "@/shared/components/HelpModal/HelpModal";
import { useMusic } from "@/shared/audio/music";

const HOME_HELP_KEY = "coo-home-help-seen";

export function HomeLayout() {
    const navigate = useNavigate();

    const [helpOpen, setHelpOpen] = useState(() => {
        const alreadySeen = localStorage.getItem(HOME_HELP_KEY);

        if (!alreadySeen) {
            localStorage.setItem(HOME_HELP_KEY, "true");
            return true;
        }

        return false;
    });

    const { muted, toggleMute } = useMusic();

    return (
        <>
            <Header
                onHomeClick={() => navigate("/")}
                onHelpClick={() => setHelpOpen(true)}
                muted={muted}
                onToggleMute={toggleMute}
            />

            <Outlet />

            <HelpModal
                open={helpOpen}
                topic="home"
                onClose={() => setHelpOpen(false)}
            />
        </>
    );
}