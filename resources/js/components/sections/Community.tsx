import React, { useEffect, useRef } from 'react';
import GradientButton from '../GradientButton';
import SocialMediaCard, {
    type SocialMediaData,
} from './SocialMediaCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const communityPlatforms: SocialMediaData[] = [
    {
        name: 'Telegram',
        icon: '/assets/icons/telegram.png',
        buttonText: 'Message Us',
    },
    {
        name: 'Facebook',
        icon: '/assets/icons/facebook.png',
        buttonText: 'Message Us',
    },
    {
        name: 'TikTok',
        icon: '/assets/icons/tiktok.png',
        buttonText: 'Message Us',
    },
    {
        name: 'Instagram',
        icon: '/assets/icons/instagram.png',
        buttonText: 'Message Us',
    },
];

export default function Community() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const headerChildren = headerRef.current?.children;
        const cardChildren = cardsRef.current?.children;

        if (headerChildren && headerChildren.length > 0) {
            // Set initial states
            gsap.set(Array.from(headerChildren), { opacity: 0, y: 50 });

            // Animate header
            gsap.to(Array.from(headerChildren), {
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

        if (cardChildren && cardChildren.length > 0) {
            // Set initial states
            gsap.set(Array.from(cardChildren), { opacity: 0, y: 100 });

            // Animate cards
            gsap.to(Array.from(cardChildren), {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
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
        <section ref={sectionRef} className="w-full px-4">
            <div className="container mx-auto">
                <div className="flex flex-col items-center gap-8">
                    {/* Header */}
                    <div
                        ref={headerRef}
                        className="flex flex-col items-center gap-4 text-center"
                    >
                        <h2 className="[font-family:'Helvetica_Neue-Bold',Helvetica] text-5xl md:text-6xl lg:text-7xl leading-tight md:leading-[93px] font-bold text-white">
                            Join Our Community
                        </h2>
                        <p className="max-w-[794px] [font-family:'Hellix-Regular',Helvetica] text-lg md:text-xl leading-8 font-normal text-white">
                            With fast withdrawals, exceptional customer support,
                            and a smooth trading experience.
                        </p>
                    </div>

                    {/* Community Cards Grid */}
                    <div
                        ref={cardsRef}
                        className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {communityPlatforms.map((platform, index) => (
                            <SocialMediaCard key={index} platform={platform} />
                        ))}
                    </div>

                    {/* Join Now Button */}
                    <div className="mt-5">
                        <GradientButton
                            variant="green"
                            href="/join"
                            className="px-8 py-3 font-semibold"
                        >
                            Join Now
                        </GradientButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
