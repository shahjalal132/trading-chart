import React, { useEffect, useRef } from 'react';
import GradientButton from '../GradientButton';
import { gsap } from 'gsap';

export default function Hero(): React.JSX.Element {
    const sectionRef = useRef<HTMLElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const h2Ref = useRef<HTMLHeadingElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);
    const buttonsContainerRef = useRef<HTMLDivElement>(null);

    const buttons = [
        {
            text: 'Join Us',
            variant: 'green' as const,
            href: '/join',
        },
        {
            text: 'Learn More',
            variant: 'red' as const,
            href: '/learn',
        },
    ];

    useEffect(() => {
        if (!sectionRef.current || !h1Ref.current || !h2Ref.current || !pRef.current || !buttonsContainerRef.current) return;

        // Set initial states
        gsap.set([h1Ref.current, h2Ref.current], { opacity: 0, y: 100 });
        gsap.set(pRef.current, { opacity: 0, y: 50 });
        gsap.set(Array.from(buttonsContainerRef.current.children), { opacity: 0, scale: 0.8 });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to(h1Ref.current, {
            y: 0,
            opacity: 1,
            duration: 1,
        })
            .to(
                h2Ref.current,
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                },
                '-=0.5'
            )
            .to(
                pRef.current,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                },
                '-=0.3'
            )
            .to(
                Array.from(buttonsContainerRef.current.children),
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.2,
                },
                '-=0.4'
            );
    }, []);

    return (
        <section ref={sectionRef} className="flex w-full flex-col">
            <div className="flex w-full flex-col gap-10">
                <h1
                    ref={h1Ref}
                    className="[font-family:'Helvetica_Neue-Bold',Helvetica] text-[110px] leading-[93px] font-bold tracking-[0] whitespace-nowrap text-white"
                >
                    Welcome to
                </h1>

                <h2
                    ref={h2Ref}
                    className="[font-family:'Helvetica_Neue-Heavy',Helvetica] text-[130px] leading-[93px] font-normal tracking-[-1.30px] whitespace-nowrap text-white"
                >
                    Trading Chart
                </h2>
            </div>

            <p
                ref={pRef}
                className="mt-[57px] max-w-[683px] [font-family:'Hellix-Regular',Helvetica] text-xl leading-[31px] font-normal tracking-[0] text-white"
            >
                Learn trading in Bangla—from basics to live trading, investment,
                and support—all in one place, with an easy step-by-step
                learning...
            </p>

            <div ref={buttonsContainerRef} className="mt-12 flex gap-7">
                {buttons.map((button, index) => (
                    <GradientButton
                        key={index}
                        variant={button.variant}
                        href={button.href}
                        className="px-8 font-semibold py-3"
                    >
                        {button.text}
                    </GradientButton>
                ))}
            </div>
        </section>
    );
}

