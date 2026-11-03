import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "@/shared/components/Header/Header";
import { HelpModal } from "@/shared/components/HelpModal/HelpModal";
import { useMusic } from "@/shared/audio/music";

export function HomeLayout() {
    const navigate = useNavigate();
    const [helpOpen, setHelpOpen] = useState(false);
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