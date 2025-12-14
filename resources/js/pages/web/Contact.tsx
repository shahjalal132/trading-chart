import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Facebook, Instagram, MessageCircle, Youtube } from 'lucide-react';
import React from 'react';

const socialMediaData = [
    {
        icon: <Youtube className="h-[61px] w-[61px]" />,
        name: 'YouTube',
        url: 'YouTube.com/tradingchart',
        buttonText: 'Follow On YouTube',
    },
    {
        icon: <img src="" alt="TikTok" className="h-14 w-14 object-cover" />,
        name: 'TikTok',
        url: 'tiktok.com/tradingchart',
        buttonText: 'Follow On TikTok',
    },
    {
        icon: <Facebook className="h-[55px] w-[55px]" />,
        name: 'Facebook',
        url: 'facebook.com/tradingchart',
        buttonText: 'Follow On Facebook',
    },
    {
        icon: <Instagram className="h-[55px] w-[55px]" />,
        name: 'Instagram',
        url: 'instagram.com/tradingchart',
        buttonText: 'Follow On Instagram',
    },
    {
        icon: <MessageCircle className="h-[55px] w-[55px]" />,
        name: 'Telegram',
        url: 'telegram.com/tradingchart',
        buttonText: 'Follow On Telegram',
    },
    {
        icon: <MessageCircle className="h-[55px] w-[55px]" />,
        name: 'WhatsApp',
        url: 'whatsapp.com/tradingchart',
        buttonText: 'Follow On WhatsApp',
    },
];

export default function Contact(): React.JSX.Element {
    return (
        <section className="w-full px-4 py-12">
            <div className="mx-auto max-w-[1206px]">
                <div className="mb-[66px] flex flex-col items-center gap-[43px]">
                    <h2 className="text-center [font-family:'Helvetica_Neue-Bold',Helvetica] text-[80px] leading-[93px] font-bold tracking-[0] whitespace-nowrap text-white">
                        Connect With Us
                    </h2>

                    <p className="max-w-[794px] text-center [font-family:'Hellix-Regular',Helvetica] text-xl leading-[31px] font-normal tracking-[0] text-white">
                        With fast withdrawals, exceptional customer support, and
                        a smooth trading experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {socialMediaData.map((platform, index) => (
                        <Card
                            key={index}
                            className="overflow-hidden rounded-[19px] border-[3px] border-solid border-[#ffffff36] bg-[#121212]"
                        >
                            <CardContent className="flex h-full flex-col p-[39px]">
                                <div className="mb-[28px] flex gap-[15px]">
                                    <div className="flex-shrink-0">
                                        {platform.icon}
                                    </div>

                                    <div className="mt-1 flex flex-col gap-[21px]">
                                        <h3 className="[font-family:'Helvetica_Neue-Bold',Helvetica] text-[32px] leading-[38px] font-bold tracking-[0] whitespace-nowrap text-white">
                                            {platform.name}
                                        </h3>

                                        <p className="[font-family:'DM_Sans-Regular',Helvetica] text-sm leading-6 font-normal tracking-[0] whitespace-nowrap text-[#fbd051]">
                                            {platform.url}
                                        </p>
                                    </div>
                                </div>

                                <p className="mb-[43px] [font-family:'DM_Sans-Regular',Helvetica] text-sm leading-6 font-normal tracking-[0] text-[#ffffffd1]">
                                    Subscribe to our official channel to watch
                                    live trades, analysis.
                                </p>

                                <Button className="h-auto rounded-2xl border border-solid border-[#ffffff61] bg-[linear-gradient(180deg,rgba(237,0,0,1)_0%,rgba(37,1,1,1)_100%)] px-[26px] py-3 [font-family:'Poppins-SemiBold',Helvetica] text-[15px] leading-[26px] font-semibold tracking-[0] text-white hover:opacity-90">
                                    {platform.buttonText}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
