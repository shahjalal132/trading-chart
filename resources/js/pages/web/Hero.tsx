import { Button } from '@/components/ui/button';

export default function Hero(): React.JSX.Element {
    const buttons = [
        {
            text: 'Join Us',
            gradient:
                'bg-[linear-gradient(180deg,rgba(24,129,0,1)_0%,rgba(1,25,3,1)_100%)]',
            width: 'w-[121px]',
        },
        {
            text: 'Learn More',
            gradient:
                'bg-[linear-gradient(180deg,rgba(237,0,0,1)_0%,rgba(37,1,1,1)_100%)]',
            width: 'w-[152px]',
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
                    <Button
                        key={index}
                        className={`${button.width} h-auto px-[30px] py-[21px] ${button.gradient} rounded-2xl border border-solid border-[#ffffff61] [font-family:'Poppins-SemiBold',Helvetica] text-base leading-[26px] font-semibold tracking-[0] whitespace-nowrap text-white hover:opacity-90`}
                    >
                        {button.text}
                    </Button>
                ))}
            </div>
        </section>
    );
};

