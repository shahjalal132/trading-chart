import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import GradientButton from '../GradientButton';
import { gsap } from 'gsap';

export interface TradingAccount {
    name: string;
    logo: string;
    href: string;
}

interface TradingAccountCardProps {
    account: TradingAccount;
}

export default function TradingAccountCard({
    account,
}: TradingAccountCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const logo = logoRef.current;
        if (!card || !logo) return;

        // Set initial background
        gsap.set(card, { background: 'transparent' });

        const handleMouseEnter = () => {
            gsap.to(card, {
                scale: 1.05,
                y: -10,
                background: 'linear-gradient(180deg, #ED0000 0%, #250101 100%)',
                duration: 0.3,
                ease: 'power2.out',
            });
            gsap.to(logo, {
                scale: 1.15,
                duration: 0.3,
                ease: 'back.out(1.7)',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                scale: 1,
                y: 0,
                background: 'transparent',
                duration: 0.3,
                ease: 'power2.out',
            });
            gsap.to(logo, {
                scale: 1,
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
            className="h-80 border-[3px] border-solid border-[var(--border-light)] rounded-[19px] p-6 cursor-pointer"
        >
            <div className="flex h-full flex-col items-center justify-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center">
                    <img
                        ref={logoRef}
                        src={account.logo}
                        alt={`${account.name} logo`}
                        className="h-20 w-20 object-cover transition-transform duration-300"
                    />
                </div>

                <h3 className="text-center [font-family:'Helvetica_Neue-Bold',Helvetica] text-3xl leading-9 font-bold text-white">
                    {account.name}
                </h3>

                <GradientButton
                    variant="red"
                    href={account.href}
                    className="px-8 py-3"
                >
                    Sign Up Now
                </GradientButton>
            </div>
        </Card>
    );
}

