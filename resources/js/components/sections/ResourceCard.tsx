import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import GradientButton from '../GradientButton';

export interface ResourceData {
    title: string;
    features: string[];
    price: string;
    href?: string;
}

interface ResourceCardProps {
    resource: ResourceData;
}

export default function ResourceCard({ resource }: { resource: ResourceData }) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Set initial transform origin and background
        gsap.set(card, { 
            transformOrigin: 'center center',
            background: '#121212'
        });

        const handleMouseEnter = () => {
            gsap.to(card, {
                scale: 1.05,
                y: -10,
                background: 'linear-gradient(180deg, #ED0000 0%, #250101 100%)',
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                scale: 1,
                y: 0,
                background: '#121212',
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="flex h-fit cursor-pointer flex-col rounded-[19px] border-[3px] border-solid border-[#ffffff36] bg-[#121212] will-change-transform"
        >
            <div className="flex flex-col p-6">
                <h2 className="mb-8 text-left text-2xl leading-[38px] font-bold tracking-[0] text-white md:text-[32px]">
                    {resource.title}
                </h2>

                <ul className="flex flex-col gap-4">
                    {resource.features.map((feature, featureIndex) => (
                        <li
                            key={featureIndex}
                            className="flex items-start gap-3.5"
                        >
                            <div className="mt-2 h-[5px] w-[5px] min-w-[5px] rounded-[2.5px] bg-[#ffffff70]" />
                            <span className="text-base leading-7 font-medium tracking-[0] text-white">
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="mt-12">
                    <GradientButton
                        variant="red"
                        href={resource.href || '/get-started'}
                        className="w-full px-8 py-3 font-semibold"
                    >
                        Get Started Now
                    </GradientButton>
                </div>

                <div className="mt-7 flex flex-col gap-5">
                    <span className="text-base leading-7 font-medium tracking-[0] text-white">
                        Course price
                    </span>
                    <span className="text-4xl leading-[38px] font-bold tracking-[0] text-white md:text-[56px]">
                        {resource.price}
                    </span>
                </div>
            </div>
        </div>
    );
}
