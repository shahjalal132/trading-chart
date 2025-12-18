import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
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

export default function ResourceCard({ resource }: ResourceCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseEnter = () => {
            gsap.to(card, {
                scale: 1.05,
                y: -10,
                boxShadow:
                    '0 25.6px 57.6px 0 rgba(237, 0, 0, 0.4), 0 4.8px 14.4px 0 rgba(237, 0, 0, 0.3), 0 0 0 1px rgba(237, 0, 0, 0.2)',
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                scale: 1,
                y: 0,
                boxShadow: 'none',
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
        <Card
            ref={cardRef}
            className="flex cursor-pointer flex-col rounded-[19px] border-[3px] border-solid border-[#ffffff36] bg-[#121212]"
        >
            <CardContent className="flex flex-col p-6">
                <h2 className="mb-8 text-center [font-family:'Helvetica_Neue-Bold',Helvetica] text-2xl leading-[38px] font-bold tracking-[0] text-white md:text-left md:text-[32px]">
                    {resource.title}
                </h2>

                <ul className="flex flex-col gap-4">
                    {resource.features.map((feature, featureIndex) => (
                        <li
                            key={featureIndex}
                            className="flex items-center gap-3.5"
                        >
                            <div className="mt-1 h-[5px] w-[5px] min-w-[5px] rounded-[2.5px] bg-[#ffffff70]" />
                            <span className="[font-family:'Satoshi-Medium',Helvetica] text-base leading-7 font-medium tracking-[0] text-white">
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="mt-12">
                    <GradientButton
                        variant="red"
                        href={resource.href || '/get-started'}
                        className="px-8 py-3 font-semibold hover:cursor-pointer"
                    >
                        Get Started Now
                    </GradientButton>
                </div>

                <div className="mt-7 flex flex-col gap-5">
                    <span className="[font-family:'Satoshi-Medium',Helvetica] text-base leading-7 font-medium tracking-[0] text-white">
                        Course price
                    </span>
                    <span className="[font-family:'Helvetica_Neue-Bold',Helvetica] text-4xl leading-[38px] font-bold tracking-[0] text-white md:text-[56px]">
                        {resource.price}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

