import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

export interface SocialMediaData {
    icon: string;
    name: string;
    url?: string;
    buttonText: string;
    description?: string;
}

interface SocialMediaCardProps {
    platform: SocialMediaData;
}

export default function SocialMediaCard({
    platform,
}: SocialMediaCardProps) {
    return (
        <Card className="overflow-hidden rounded-[19px] border-[3px] border-solid border-[var(--border-light)] bg-[var(--card-dark)]">
            <CardContent className="flex h-full flex-col p-[39px]">
                <div className="mb-[28px] flex gap-[15px]">
                    <div className="flex-shrink-0">
                        <img
                            src={platform.icon}
                            alt={platform.name}
                            className="h-14 w-14 object-cover"
                        />
                    </div>

                    <div className="mt-1 flex flex-col gap-2">
                        <h3 className="[font-family:'Helvetica_Neue-Bold',Helvetica] text-[32px] leading-[38px] font-bold tracking-[0] whitespace-nowrap text-white">
                            {platform.name}
                        </h3>

                        {platform.url && (
                            <p className="[font-family:'DM_Sans-Regular',Helvetica] text-sm leading-6 font-normal tracking-[0] whitespace-nowrap text-[var(--accent-yellow)]">
                                {platform.url}
                            </p>
                        )}
                    </div>
                </div>

                {platform.description && (
                    <p className="mb-[43px] [font-family:'DM_Sans-Regular',Helvetica] text-sm leading-6 font-normal tracking-[0] text-[var(--text-muted)]">
                        {platform.description}
                    </p>
                )}

                <Button
                    className="h-auto max-w-[200px] rounded-2xl border border-solid border-[var(--border-medium)] py-2 [font-family:'Poppins-SemiBold',Helvetica] text-[15px] leading-[26px] font-semibold tracking-[0] text-white hover:opacity-90"
                    style={{
                        background: `linear-gradient(180deg, var(--gradient-red-start) 0%, var(--gradient-red-end) 100%)`,
                    }}
                >
                    {platform.buttonText}
                </Button>
            </CardContent>
        </Card>
    );
}

