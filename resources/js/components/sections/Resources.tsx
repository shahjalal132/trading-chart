import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const resourceCards = [
    {
        title: 'VIP SIGNALS',
        subtitle: 'all in one place, with an easy step',
        features: [
            'In-depth market analysis',
            'Competitor keyword tracking',
            'Long-tail keyword identification',
            'Long-tail keyword identification',
        ],
    },
    {
        title: 'MASTER TRADING VOURSE',
        subtitle: 'all in one place, with an easy step',
        features: [
            'In-depth market analysis',
            'Competitor keyword tracking',
            'Long-tail keyword identification',
            'Long-tail keyword identification',
        ],
    },
    {
        title: 'COPY TRADE',
        subtitle: 'all in one place, with an easy step',
        features: [
            'In-depth market analysis',
            'Competitor keyword tracking',
            'Long-tail keyword identification',
            'Long-tail keyword identification',
        ],
    },
];

export default function Resources(): React.JSX.Element {
    return (
        <section className="flex w-full flex-col items-center py-16 md:py-24 px-4">
            <h2 className="text-center [font-family:'Helvetica_Neue-Bold',Helvetica] text-[80px] leading-[93px] font-bold tracking-[0] whitespace-nowrap text-white">
                Your Resources
            </h2>

            <p className="mt-[43px] text-center [font-family:'Hellix-Regular',Helvetica] text-xl leading-[31px] font-normal tracking-[0] whitespace-nowrap text-white">
                One of the world&apos;s most popular multi-asset brokers.
            </p>

            <div className="mt-12 grid w-full max-w-[1206px] grid-cols-1 gap-[30px] md:grid-cols-3">
                {resourceCards.map((card, index) => (
                    <Card
                        key={index}
                        className="h-[455px] rounded-[19px] border-[3px] border-solid border-[var(--border-light)] bg-[var(--card-dark)]"
                    >
                        <CardContent className="flex h-full flex-col items-center justify-between p-[52px_0]">
                            <div className="flex w-full flex-col items-center px-8">
                                <h3 className="text-center [font-family:'Helvetica_Neue-Bold',Helvetica] text-[32px] leading-[38px] font-bold tracking-[0] text-white">
                                    {card.title}
                                </h3>

                                <p className="mt-[27px] [font-family:'Helvetica_Neue-Regular',Helvetica] text-base leading-[31px] font-normal tracking-[0] whitespace-nowrap text-white">
                                    {card.subtitle}
                                </p>

                                <div className="mt-[74px] flex w-full flex-col gap-[26px]">
                                    {card.features.map(
                                        (feature, featureIndex) => (
                                            <div
                                                key={featureIndex}
                                                className="flex items-start gap-3.5"
                                            >
                                                <div className="mt-1 h-[5px] w-[5px] flex-shrink-0 rounded-[2.5px] bg-[var(--dot-light)]" />
                                                <span className="[font-family:'Satoshi-Medium',Helvetica] text-base leading-7 font-medium tracking-[0] text-white">
                                                    {feature}
                                                </span>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            <Button className="mt-10 h-auto w-[194px] rounded-2xl border border-solid border-[var(--border-medium)] px-[30px] py-[21px] [font-family:'Poppins-SemiBold',Helvetica] text-base leading-[26px] font-semibold tracking-[0] text-white hover:opacity-90" style={{ background: `linear-gradient(180deg, var(--gradient-red-start) 0%, var(--gradient-red-end) 100%)` }}>
                                Get Started Now
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
