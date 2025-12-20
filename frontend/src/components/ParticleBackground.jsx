import React, { useEffect } from "react";
import "./particles.css";

export default function ParticlesBackground() {
    useEffect(() => {
        const particles = document.querySelectorAll(".particle");

        particles.forEach((p) => {
            const animate = () => {
                const x = Math.random() *window.innerWidth;
                const y = Math.random() *window.innerHeight;
                const duration = 8000 + Math.random() * 4000;

                p.animate(
                    [{ transform:`translate(${x}px, ${y}px)` }],
                    { duration, fill: "forwards"}
                );

                setTimeout(animate, duration);
            };

            animate();
        });
    }, []);

    return (
        <div className="particles-container">
            {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="particle"></div>
            ))}
        </div>
    );
}