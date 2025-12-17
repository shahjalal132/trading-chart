import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function TradingBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const redLineRef = useRef<SVGPathElement>(null);
    const greenLineRef = useRef<SVGPathElement>(null);
    const redDotRef = useRef<SVGCircleElement>(null);
    const greenDotRef = useRef<SVGCircleElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Animate red line drawing effect
        if (redLineRef.current) {
            const redPathLength = redLineRef.current.getTotalLength();
            gsap.set(redLineRef.current, {
                strokeDasharray: redPathLength,
                strokeDashoffset: redPathLength,
            });

            gsap.to(redLineRef.current, {
                strokeDashoffset: 0,
                duration: 3,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true,
            });

            // Animate red dot position
            if (redDotRef.current) {
                gsap.to(redDotRef.current, {
                    x: 20,
                    y: -30,
                    duration: 3,
                    ease: 'power2.inOut',
                    repeat: -1,
                    yoyo: true,
                });
            }
        }

        // Animate green line drawing effect
        if (greenLineRef.current) {
            const greenPathLength = greenLineRef.current.getTotalLength();
            gsap.set(greenLineRef.current, {
                strokeDasharray: greenPathLength,
                strokeDashoffset: greenPathLength,
            });

            gsap.to(greenLineRef.current, {
                strokeDashoffset: 0,
                duration: 4,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true,
                delay: 0.5,
            });

            // Animate green dot position
            if (greenDotRef.current) {
                gsap.to(greenDotRef.current, {
                    x: -20,
                    y: 30,
                    duration: 4,
                    ease: 'power2.inOut',
                    repeat: -1,
                    yoyo: true,
                    delay: 0.5,
                });
            }
        }

        // Floating particles animation
        const particles = containerRef.current.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const randomY = gsap.utils.random(-100, 100);
            const randomX = gsap.utils.random(-50, 50);
            const randomDuration = gsap.utils.random(3, 5);

            gsap.to(particle, {
                y: `+=${randomY}`,
                x: `+=${randomX}`,
                duration: randomDuration,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: index * 0.2,
            });
        });
    }, []);

    return (
        <div
            ref={containerRef}
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
            aria-hidden="true"
        >
            {/* Red Chart Line */}
            <svg
                className="absolute bottom-0 left-0 h-full w-full opacity-30"
                viewBox="0 0 1200 897"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    ref={redLineRef}
                    d="M 0 850 Q 150 700 300 650 Q 450 600 500 550 Q 550 500 600 450 Q 650 400 700 420"
                    stroke="#ed0000"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                />
                <circle
                    ref={redDotRef}
                    cx="700"
                    cy="420"
                    r="5"
                    fill="#ed0000"
                />
            </svg>

            {/* Green Chart Line */}
            <svg
                className="absolute bottom-0 right-0 h-full w-full opacity-30"
                viewBox="0 0 1200 897"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    ref={greenLineRef}
                    d="M 1200 850 Q 1050 700 900 600 Q 750 500 700 450 Q 650 400 600 350 Q 550 300 500 250 Q 450 200 400 180"
                    stroke="#18ff00"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                />
                <circle
                    ref={greenDotRef}
                    cx="400"
                    cy="180"
                    r="5"
                    fill="#18ff00"
                />
            </svg>

            {/* Floating Particles */}
            {Array.from({ length: 20 }).map((_, index) => (
                <div
                    key={index}
                    className="particle absolute h-1 w-1 rounded-full bg-white/20"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                />
            ))}
        </div>
    );
}

