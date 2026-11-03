import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "@/shared/components/Header/Header";
import { HelpModal } from "@/shared/components/HelpModal/HelpModal";

export function HomeLayout() {
    const navigate = useNavigate();
    const [helpOpen, setHelpOpen] = useState(false);

    return (
        <>
            <Header
                onHomeClick={() => navigate("/")}
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