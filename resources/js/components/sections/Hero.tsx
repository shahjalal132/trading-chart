import React from 'react';
import GradientButton from '../GradientButton';

export default function Hero(): React.JSX.Element {
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

    return (
        <section className="flex w-full flex-col">
            <div className="flex w-full flex-col gap-10">
                <h1 className="[font-family:'Helvetica_Neue-Bold',Helvetica] text-[110px] leading-[93px] font-bold tracking-[0] whitespace-nowrap text-white">
                    Welcome to
                </h1>

                <h2 className="[font-family:'Helvetica_Neue-Heavy',Helvetica] text-[130px] leading-[93px] font-normal tracking-[-1.30px] whitespace-nowrap text-white">
                    Trading Chart
                </h2>
            </div>

            <p className="mt-[57px] max-w-[683px] [font-family:'Hellix-Regular',Helvetica] text-xl leading-[31px] font-normal tracking-[0] text-white">
                Learn trading in Bangla—from basics to live trading, investment,
                and support—all in one place, with an easy step-by-step
                learning...
            </p>

            <div className="mt-12 flex gap-7">
                {buttons.map((button, index) => (
                    <GradientButton
                        key={index}
                        variant={button.variant}
                        href={button.href}
                        className="p-5"
                    >
                        {button.text}
                    </GradientButton>
                ))}
            </div>
        </section>
    );
};

