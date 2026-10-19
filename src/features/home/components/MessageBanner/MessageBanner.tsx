import { useEffect, useState } from "react"
import "./MessageBanner.css"

const MESSAGES = [
    "Vamos dar cor a nossa cidade. Construa objetos e dê vida a ela!",
    "Cada classe é uma planta: com ela você constrói quantos objetos quiser.",
    "Atributos dizem como o objeto é. Métodos dizem o que ele faz.",
    "Reutilize código com herança e deixe sua cidade crescer mais rápido.",
    "Complete as fases para desbloquear novas partes da cidade!",
];

const INTERVAL_MS = 10000;


export function MessageBanner() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((current) => (current + 1) % MESSAGES.length);
        }, INTERVAL_MS);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="message-banner" aria-live="polite">
            <p key={index} className="message-banner-text">
                {MESSAGES[index]}
            </p>
        </section>
    )
}