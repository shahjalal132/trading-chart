import React from 'react';
import SocialMediaCard, {
    type SocialMediaData,
} from './SocialMediaCard';

const socialMediaData: SocialMediaData[] = [
    {
        icon: '/assets/icons/youtube.png',
        name: 'YouTube',
        url: 'YouTube.com/tradingchart',
        buttonText: 'Follow On YouTube',
        description:
            'Subscribe to our official channel to watch live trades, analysis.',
    },
    {
        icon: '/assets/icons/tiktok.png',
        name: 'TikTok',
        url: 'tiktok.com/tradingchart',
        buttonText: 'Follow On TikTok',
        description:
            'Subscribe to our official channel to watch live trades, analysis.',
    },
    {
        icon: '/assets/icons/facebook.png',
        name: 'Facebook',
        url: 'facebook.com/tradingchart',
        buttonText: 'Follow On Facebook',
        description:
            'Subscribe to our official channel to watch live trades, analysis.',
    },
    {
        icon: '/assets/icons/instagram.png',
        name: 'Instagram',
        url: 'instagram.com/tradingchart',
        buttonText: 'Follow On Instagram',
        description:
            'Subscribe to our official channel to watch live trades, analysis.',
    },
    {
        icon: '/assets/icons/telegram.png',
        name: 'Telegram',
        url: 'telegram.com/tradingchart',
        buttonText: 'Follow On Telegram',
        description:
            'Subscribe to our official channel to watch live trades, analysis.',
    },
    {
        icon: '/assets/icons/whatsapp.png',
        name: 'WhatsApp',
        url: 'whatsapp.com/tradingchart',
        buttonText: 'Follow On WhatsApp',
        description:
            'Subscribe to our official channel to watch live trades, analysis.',
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
                        <SocialMediaCard key={index} platform={platform} />
                    ))}
                </div>
            </div>
        </section>
    );
}
