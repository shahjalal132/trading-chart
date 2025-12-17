import React, { useEffect, useRef } from 'react';
import { CountUp } from 'countup.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatData {
    value: number;
    suffix: string;
    label: string;
}

const statsData: StatData[] = [
    {
        value: 579000,
        suffix: 'k',
        label: 'Our Subscribers',
    },
    {
        value: 21000,
        suffix: 'k',
        label: 'Our Subscribers',
    },
    {
        value: 3000,
        suffix: 'k',
        label: 'Active Clients',
    },
    {
        value: 5,
        suffix: '',
        label: 'Years Experience',
    },
];

export default function Counter(): React.JSX.Element {
    const sectionRef = useRef<HTMLElement>(null);
    const counterRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        statsData.forEach((stat, index) => {
            const element = counterRefs.current[index];
            if (!element) return;

            // Format the number based on suffix
            let endValue = stat.value;
            let suffix = '';
            
            if (stat.suffix === 'k') {
                if (stat.value >= 1000) {
                    endValue = Math.floor(stat.value / 1000);
                    suffix = 'k';
                } else {
                    endValue = stat.value;
                    suffix = 'k';
                }
            } else {
                endValue = stat.value;
                suffix = '';
            }

            const counter = new CountUp(element, endValue, {
                duration: 2.5,
                separator: '',
                suffix: suffix ? ` ${suffix}+` : '+',
                useEasing: true,
                easingFn: (t, b, c, d) => {
                    t /= d / 2;
                    if (t < 1) return (c / 2) * t * t + b;
                    t--;
                    return (-c / 2) * (t * (t - 2) - 1) + b;
                },
            });

            ScrollTrigger.create({
                trigger: element,
                start: 'top 80%',
                onEnter: () => {
                    if (!counter.error) {
                        counter.start();
                    }
                },
                once: true,
            });
        });

        // Animate cards on scroll
        const validRefs = counterRefs.current.filter((ref) => ref !== null);
        if (validRefs.length > 0) {
            // Set initial states
            gsap.set(validRefs, { opacity: 0, y: 50 });

            gsap.to(validRefs, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: 'power2.out',
            });
        }

        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh();

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative flex items-center justify-center py-8 md:py-12"
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-[116px] w-full">
                    {statsData.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-start text-center"
                        >
                            <div
                                ref={(el) => {
                                    counterRefs.current[index] = el;
                                }}
                                className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-[#ed0000] text-5xl md:text-6xl lg:text-[78px] tracking-[0] leading-tight md:leading-[93px] whitespace-nowrap"
                            >
                                0
                            </div>
                            <div className="[font-family:'Hellix-SemiBold',Helvetica] font-semibold text-white text-base md:text-lg lg:text-xl tracking-[0] leading-normal md:leading-[31px] whitespace-nowrap">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
