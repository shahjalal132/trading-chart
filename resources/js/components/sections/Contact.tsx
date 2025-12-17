import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Facebook, Instagram, MessageCircle, Youtube } from 'lucide-react';
import React from 'react';

const socialMediaData = [
    {
        icon: '/assets/icons/youtube.png',
        name: 'YouTube',
        url: 'YouTube.com/tradingchart',
        buttonText: 'Follow On YouTube',
    },
    {
        icon: '/assets/icons/tiktok.png',
        name: 'TikTok',
        url: 'tiktok.com/tradingchart',
        buttonText: 'Follow On TikTok',
    },
    {
        icon: '/assets/icons/facebook.png',
        name: 'Facebook',
        url: 'facebook.com/tradingchart',
        buttonText: 'Follow On Facebook',
    },
    {
        icon: '/assets/icons/instagram.png',
        name: 'Instagram',
        url: 'instagram.com/tradingchart',
        buttonText: 'Follow On Instagram',
    },
    {
        icon: '/assets/icons/telegram.png',
        name: 'Telegram',
        url: 'telegram.com/tradingchart',
        buttonText: 'Follow On Telegram',
    },
    {
        icon: '/assets/icons/whatsapp.png',
        name: 'WhatsApp',
        url: 'whatsapp.com/tradingchart',
        buttonText: 'Follow On WhatsApp',
    },
];

export default function Contact(): React.JSX.Element {
    return (
        <section className="w-full px-15">
            <div className="container mx-auto">
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
                            className="overflow-hidden rounded-[19px] border-[3px] border-solid border-[var(--border-light)] bg-[var(--card-dark)]"
                        >
                            <CardContent className="flex h-full flex-col p-[39px]">
                                <div className="mb-[28px] flex gap-[15px]">
                                    <div className="flex-shrink-0">
                                        {/* social media icon */}
                                        <img src={platform.icon} alt={platform.name} className="h-14 w-14 object-cover" />
                                    </div>

                                    <div className="mt-1 flex flex-col gap-2">
                                        <h3 className="[font-family:'Helvetica_Neue-Bold',Helvetica] text-[32px] leading-[38px] font-bold tracking-[0] whitespace-nowrap text-white">
                                            {platform.name}
                                        </h3>

                                        <p className="[font-family:'DM_Sans-Regular',Helvetica] text-sm leading-6 font-normal tracking-[0] whitespace-nowrap text-[var(--accent-yellow)]">
                                            {platform.url}
                                        </p>
                                    </div>
                                </div>

                                <p className="mb-[43px] [font-family:'DM_Sans-Regular',Helvetica] text-sm leading-6 font-normal tracking-[0] text-[var(--text-muted)]">
                                    Subscribe to our official channel to watch
                                    live trades, analysis.
                                </p>

                                <Button className="h-auto max-w-[200px] rounded-2xl border border-solid border-[var(--border-medium)] py-2 [font-family:'Poppins-SemiBold',Helvetica] text-[15px] leading-[26px] font-semibold tracking-[0] text-white hover:opacity-90" style={{ background: `linear-gradient(180deg, var(--gradient-red-start) 0%, var(--gradient-red-end) 100%)` }}>
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
