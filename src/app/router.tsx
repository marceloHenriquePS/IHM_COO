import { createBrowserRouter } from "react-router-dom";
import { BlankLayout } from "./layouts/BlankLayout";
import { HomeLayout} from "./layouts/HomeLayout"
import { MainLayout } from "./layouts/MainLayout";
import { NotFound } from "@/features/not-found";
import { MainMenu } from "@/features/main-menu";
import { Home } from "@/features/home";
import { PhaseSelector } from "@/features/phase-selector";

export const router = createBrowserRouter([
    {
        element: <BlankLayout/>,
        children: [
            {path: "/", element: <MainMenu/>},
            {path: "*", element: <NotFound/>},
            
        ]
    },
    {
        element: <HomeLayout/>,
        children: [{path: "/home", element: <Home/>},]
    },
    {
        element: <MainLayout/>,
        children: [
            {path: "/modules/:moduleId", element: <PhaseSelector/>},
        ]
    }
]);