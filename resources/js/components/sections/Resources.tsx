import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import ResourceCard, { type ResourceData } from './ResourceCard';

gsap.registerPlugin(ScrollTrigger);

const resourcesData: ResourceData[] = [
    {
        title: 'CONSULTATION',
        features: [
            'Trading guidance and Investments',
            'Strategy Improvement',
            'Risk management advice',
            'Beginner assistance',
            'Mentorship support',
            'Trading psychology tips',
        ],
        price: '$50',
    },
    {
        title: 'TRADE WITH ME',
        features: [
            'Real time market analysis',
            'Live trade with high accuracy',
            'Entry exit plan',
            '24/7 Support',
            'Copy my every trades',
            'Risk management like me',
            '25% Growth per session',
        ],
        price: 'Free',
    },
    {
        title: 'COURSE',
        features: [
            'Basic to advance',
            'Price action',
            'SMC / ICT and many proven trading strategies',
            'Classes: 15 live sessions via Google meet',
            'Time: Classes will start at 9:00 p.m. (Bangladesh time)',
            'All the classes will be recorded for your practice and review',
        ],
        price: '$900',
        href: '/course/details',
    },
    {
        title: 'FREE LIVE TRIALS',
        features: [
            'Live Trades',
            'Copy my Trade',
            'Entry exit',
            'Aftermarket analysis and review',
            'Trades management',
        ],
        price: 'Free',
    },
];

export default function Resources() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !cardsContainerRef.current) return;

        const cards = cardsContainerRef.current.children;
        if (cards.length === 0) return;

        // Set initial states
        gsap.set(Array.from(cards), { opacity: 0, y: 100 });

        // Scroll reveal animation
        gsap.to(Array.from(cards), {
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

        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh();

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="flex min-h-screen w-full items-center justify-center px-4"
        >
            <div className="flex w-full max-w-[1621px] flex-col items-center">
                <h1 className="mb-10 text-center [font-family:'Helvetica_Neue-Bold',Helvetica] text-5xl leading-tight font-bold tracking-[0] text-white md:text-[80px]">
                    Your Resources
                </h1>

                <p className="mb-12 text-center [font-family:'Hellix-Regular',Helvetica] text-lg leading-[31px] font-normal tracking-[0] text-white md:text-xl">
                    One of the world&apos;s most popular multi-asset brokers.
                </p>

                <div
                    ref={cardsContainerRef}
                    className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
                >
                    {resourcesData.map((resource, index) => (
                        <ResourceCard key={index} resource={resource} />
                    ))}
                </div>
            </div>
        </section>
    );
}
