import { Outlet } from "react-router-dom";
import { Header } from "@/shared/components/Header/Header";

export function HomeLayout() {
    return (
        <>
            <Header
                onAboutClick={() => console.log("sobre")}
                onHelpClick={() => console.log("ajuda")}
            />
            <Outlet/>
        </>
    );
}