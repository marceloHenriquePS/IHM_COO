import { useState } from "react";
import { Outlet, useMatch, useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/shared/components/Header/Header";
import { getPhase } from "@/shared/data/modules";
import { HelpModal } from "@/shared/components/HelpModal/HelpModal";
import type { HelpTopic } from "@/shared/components/HelpModal/helpContent";

export function MainLayout() {
    const navigate = useNavigate();

    const [helpOpen, setHelpOpen] = useState(false);

    const match = useMatch("/modules/:moduleId/phases/:phaseId");
    const [params] = useSearchParams();

    const phase = match
        ? getPhase(
            Number(match.params.moduleId),
            Number(match.params.phaseId)
        )
        : undefined;

    const stepIndex = Number(params.get("step") ?? 0) || 0;
    const stepType = phase?.steps[stepIndex]?.type;

    const helpTopic: HelpTopic | undefined = match
        ? stepType
        : "phase-selector";

    return (
        <>
            <Header
                onHomeClick={() => navigate("/home")}
                onHelpClick={() => setHelpOpen(true)}
            />

            <Outlet />

            <HelpModal
                open={helpOpen}
                topic={helpTopic}
                onClose={() => setHelpOpen(false)}
            />
        </>
    );
}