import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/shared/components/Header/Header";
import { HelpModal } from "@/shared/components/HelpModal/HelpModal";

export function HomeLayout() {
    const [helpOpen, setHelpOpen] = useState(false);

    return (
        <>
            <Header
                onHelpClick={() => setHelpOpen(true)}
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