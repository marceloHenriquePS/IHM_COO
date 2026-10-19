import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "@/shared/components/Header/Header";

export function MainLayout() {
    const navigate = useNavigate();

    return (
        <>
            <Header
                onAboutClick={() => console.log("sobre")}
                onHelpClick={() => console.log("ajuda")}
                onHomeClick={() => navigate("/home")}
            />
            <Outlet/>
        </>
    );
}