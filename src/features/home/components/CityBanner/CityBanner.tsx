import "./CityBanner.css"
import banner from "@/features/home/assets/background-city-gray-2.png"

export function CityBanner() {
    return (
        <section className="city-banner">
            <img src={banner} alt="Fundo da cidade em tom cinza" className="city-banner-image"/>
        </section>
    );
}