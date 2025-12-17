import GradientButton from '../GradientButton';
import TradingAccountCard, { type TradingAccount } from './TradingAccountCard';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tradingAccounts: TradingAccount[] = [
    {
        name: 'Exness',
        logo: '/assets/icons/exness.png',
        href: '/exness',
    },
    {
        name: 'Octa',
        logo: '/assets/icons/octa.png',
        href: '/octa',
    },
    {
        name: 'XM',
        logo: '/assets/icons/xm.png',
        href: '/xm',
    },
    {
        name: 'Binance',
        logo: '/assets/icons/binance.png',
        href: '/binance',
    },
];

export default function Accounts() {
    const sectionRef = useRef<HTMLElement>(null);
    const leftContentRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const leftChildren = leftContentRef.current?.children;
        const cardChildren = cardsRef.current?.children;

        if (leftChildren && leftChildren.length > 0) {
            // Set initial states
            gsap.set(Array.from(leftChildren), { opacity: 0, x: -100 });

            // Animate left content
            gsap.to(Array.from(leftChildren), {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                x: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: 'power2.out',
            });
        }

        if (cardChildren && cardChildren.length > 0) {
            // Set initial states
            gsap.set(Array.from(cardChildren), { opacity: 0, x: 100 });

            // Animate cards
            gsap.to(Array.from(cardChildren), {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                x: 0,
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
                <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
                    {/* Left Content */}
                    <div ref={leftContentRef} className="flex flex-1 flex-col gap-8">
                        <h2 className="[font-family:'Helvetica_Neue-Bold',Helvetica] text-5xl font-bold text-white md:text-6xl md:leading-[85px] lg:text-7xl">
                            Create Your <br /> Trading Accounts
                        </h2>

                        <p className="max-w-[695px] [font-family:'Hellix-Regular',Helvetica] text-lg leading-8 font-normal text-white md:text-xl">
                            Trading is the skill of analyzing price movements in
                            the financial markets and making decisions to earn
                            profit from those changes. It is not just buying and
                            selling—trading involves understanding market
                            trends, support and resistance, risk management, and
                            trader psychology. With patience, discipline, and
                            proper knowledge, anyone can develop this skill and
                            create a source of long-term financial growth.
                        </p>

                        <div className="mt-5">
                            <GradientButton
                                variant="green"
                                href="/open-account"
                                className="w-fit px-10 py-3 font-semibold"
                            >
                                Open an Account
                            </GradientButton>
                        </div>
                    </div>

                    {/* Right Grid - Trading Accounts */}
                    <div className="flex-1">
                        <div ref={cardsRef} className="grid grid-cols-2 gap-6">
                            {tradingAccounts.map((account, index) => (
                                <TradingAccountCard
                                    key={index}
                                    account={account}
                                />
                            ))}
                        </div>
                        <p className="mt-6 font-medium text-[20px] text-center text-white">
                            Select 01 to open your account
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
