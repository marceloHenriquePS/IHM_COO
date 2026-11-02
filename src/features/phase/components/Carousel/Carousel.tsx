import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import "./Carousel.css";

export function Carousel({ children }: { children: ReactNode }) {
    const viewport = useRef<HTMLDivElement>(null);
    const track = useRef<HTMLDivElement>(null);
    const [edges, setEdges] = useState({ start: true, end: true });

    const measure = useCallback(() => {
        const el = viewport.current;
        if (!el) return;
        const next = {
            start: el.scrollLeft <= 1,
            end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
        };
        setEdges((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
    }, []);

    useEffect(() => {
        const observer = new ResizeObserver(measure);
        if (viewport.current) observer.observe(viewport.current);
        if (track.current) observer.observe(track.current);
        return () => observer.disconnect();
    }, [measure]);

    function scroll(direction: 1 | -1) {
        const el = viewport.current;
        if (!el) return;
        el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
    }

    return (
        <div className="carousel">
            <button
                type="button"
                className="carousel-arrow"
                aria-label="Ver anteriores"
                disabled={edges.start}
                onClick={() => scroll(-1)}
            >
                ◀
            </button>

            <div className="carousel-viewport" ref={viewport} onScroll={measure}>
                <div className="carousel-track" ref={track}>
                    {children}
                </div>
            </div>

            <button
                type="button"
                className="carousel-arrow"
                aria-label="Ver próximos"
                disabled={edges.end}
                onClick={() => scroll(1)}
            >
                ▶
            </button>
        </div>
    );
}