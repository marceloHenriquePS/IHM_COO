import { CityBanner } from "./CityBanner/CityBanner";
import { MessageBanner } from "./MessageBanner/MessageBanner";
import { LearningJourney } from "./LearningJourney/LearningJourney";
import "./Home.css"

export function Home() {
    return(
        <>
            <CityBanner />
            <MessageBanner />
            <LearningJourney />
        </>
    );
}