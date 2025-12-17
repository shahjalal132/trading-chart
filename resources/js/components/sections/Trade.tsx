import GradientButton from '../GradientButton';

export default function Trade() {
    return (
        <section className="relative flex w-full items-start px-15">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-start gap-8">
                            <h2 className="[font-family:'Helvetica_Neue-Bold',Helvetica] text-[60px] font-bold text-white md:leading-[85px]">
                                Make You Trade Profession <br /> Successful
                            </h2>

                            <p className="[font-family:'Helvetica_Neue-Bold',Helvetica] text-[32px] leading-[42px] font-bold tracking-[0] text-white">
                                Consistency beats intelligence in trading. Show
                                up every day, results will follow."
                            </p>
                        </div>

                        <div className="flex items-center gap-[13px]">
                            <div className="h-px w-[66px] bg-white/20" />
                            <div className="[font-family:'Hellix-Regular',Helvetica] text-xl leading-[31px] font-normal tracking-[0] whitespace-nowrap text-white">
                                Robin Ahmed
                            </div>
                        </div>

                        <p className="max-w-[493px] [font-family:'Helvetica_Neue-Medium',Helvetica] text-xl leading-[30px] font-medium tracking-[0] text-white">
                            One step on your side if you're interested to make <br/>
                            your professional.
                        </p>

                        <GradientButton
                            variant="green"
                            href="/trade"
                            className="md:max-w-[178px] font-semibold px-4 py-4"
                        >
                            Enroll Now
                        </GradientButton>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <img
                            className="h-auto w-full rounded-[19px] object-cover"
                            alt="Professional trader"
                            src="/assets/images/person3.png"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
