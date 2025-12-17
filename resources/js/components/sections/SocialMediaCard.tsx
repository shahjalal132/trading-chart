import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export interface SocialMediaData {
    icon: string;
    name: string;
    url?: string;
    buttonText: string;
    description?: string;
}

interface SocialMediaCardProps {
    platform: SocialMediaData;
}

export default function SocialMediaCard({
    platform,
}: SocialMediaCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const icon = iconRef.current;
        if (!card || !icon) return;

        const handleMouseEnter = () => {
            gsap.to(card, {
                scale: 1.05,
                y: -10,
                rotationY: 5,
                boxShadow: '0 25.6px 57.6px 0 rgba(237, 0, 0, 0.4), 0 4.8px 14.4px 0 rgba(237, 0, 0, 0.3), 0 0 0 1px rgba(237, 0, 0, 0.2)',
                duration: 0.3,
                ease: 'power2.out',
            });
            gsap.to(icon, {
                scale: 1.2,
                rotation: 360,
                duration: 0.5,
                ease: 'back.out(1.7)',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                scale: 1,
                y: 0,
                rotationY: 0,
                boxShadow: 'none',
                duration: 0.3,
                ease: 'power2.out',
            });
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
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
            className="overflow-hidden rounded-[19px] border-[3px] border-solid border-[var(--border-light)] bg-[var(--card-dark)] cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
        >
            <CardContent className="flex h-full flex-col p-[39px]">
                <div className="mb-[28px] flex gap-[15px]">
                    <div className="flex-shrink-0">
                        <img
                            ref={iconRef}
                            src={platform.icon}
                            alt={platform.name}
                            className="h-14 w-14 object-cover transition-transform duration-300"
                        />
                    </div>

                    <div className="mt-1 flex flex-col gap-2">
                        <h3 className="[font-family:'Helvetica_Neue-Bold',Helvetica] text-[32px] leading-[38px] font-bold tracking-[0] whitespace-nowrap text-white">
                            {platform.name}
                        </h3>

                        {platform.url && (
                            <p className="[font-family:'DM_Sans-Regular',Helvetica] text-sm leading-6 font-normal tracking-[0] whitespace-nowrap text-[var(--accent-yellow)]">
                                {platform.url}
                            </p>
                        )}
                    </div>
                </div>

                {platform.description && (
                    <p className="mb-[43px] [font-family:'DM_Sans-Regular',Helvetica] text-sm leading-6 font-normal tracking-[0] text-[var(--text-muted)]">
                        {platform.description}
                    </p>
                )}

                <Button
                    className="h-auto max-w-[200px] rounded-2xl border border-solid border-[var(--border-medium)] py-2 [font-family:'Poppins-SemiBold',Helvetica] text-[15px] leading-[26px] font-semibold tracking-[0] text-white hover:opacity-90"
                    style={{
                        background: `linear-gradient(180deg, var(--gradient-red-start) 0%, var(--gradient-red-end) 100%)`,
                    }}
                >
                    {platform.buttonText}
                </Button>
            </CardContent>
        </Card>
    );
}

