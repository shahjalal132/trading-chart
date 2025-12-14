import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const platformsData = [
  {
    name: "Exness",
    logo: "stock-1.png",
    logoType: "image",
    description:
      "One of the world's most popular multi-asset brokers. With fast withdrawals, exceptional.",
  },
  {
    name: "Binance",
    logo: "/vector-8.svg",
    logoType: "background",
    description:
      "One of the world's most popular multi-asset brokers. With fast withdrawals, exceptional.",
  },
  {
    name: "TradingView",
    logo: { vector9: "vector-9.svg", vector10: "vector-10.svg" },
    logoType: "composite",
    description:
      "One of the world's most popular multi-asset brokers. With fast withdrawals, exceptional.",
  },
];

export default function Platforms(): React.JSX.Element {
  return (
    <section className="w-full flex flex-col items-center gap-[43px] py-8">
      <header className="flex flex-col items-center gap-[43px]">
        <h2 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-white text-[80px] text-center tracking-[0] leading-[93px] whitespace-nowrap">
          Best Trading Platforms
        </h2>

        <p className="[font-family:'Hellix-Regular',Helvetica] font-normal text-white text-xl text-center tracking-[0] leading-[31px] whitespace-nowrap">
          With fast withdrawals, exceptional customer support, and a smooth
          trading experience.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[26px] w-full max-w-[1206px]">
        {platformsData.map((platform, index) => (
          <Card
            key={index}
            className="bg-[#121212] rounded-[19px] border-[3px] border-solid border-[#ffffff36] overflow-hidden"
          >
            <CardContent className="flex flex-col items-center gap-6 p-6 pt-[60px] pb-[40px]">
              <h3 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-white text-[44px] text-center tracking-[0] leading-[38px] whitespace-nowrap">
                {platform.name}
              </h3>

              <div className="w-[113px] h-[113px] flex items-center justify-center">
                {platform.logoType === "image" && (
                  <img
                    className="w-[113px] h-[113px] aspect-[1] object-cover"
                    alt={`${platform.name} logo`}
                    src={platform.logo as string}
                  />
                )}
                {platform.logoType === "background" && (
                  <div
                    className="w-[113px] h-[113px] aspect-[1] bg-[100%_100%]"
                    style={{ backgroundImage: `url(${platform.logo})` }}
                  />
                )}
                {platform.logoType === "composite" && (
                  <div className="relative w-[146px] h-[113px] aspect-[1.29]">
                    <img
                      className="absolute w-[98.61%] h-[64.29%] top-[14.29%] left-0"
                      alt="Vector"
                      src={
                        (platform.logo as { vector9: string; vector10: string })
                          .vector9
                      }
                    />
                    <img
                      className="absolute w-[22.22%] h-[28.57%] top-[14.29%] left-[44.44%]"
                      alt="Vector"
                      src={
                        (platform.logo as { vector9: string; vector10: string })
                          .vector10
                      }
                    />
                  </div>
                )}
              </div>

              <p className="w-[336px] [font-family:'Hellix-Regular',Helvetica] font-normal text-white text-xl text-center tracking-[0] leading-[31px]">
                {platform.description}
              </p>

              <Button className="h-auto px-[26px] py-4 bg-[linear-gradient(180deg,rgba(237,0,0,1)_0%,rgba(37,1,1,1)_100%)] rounded-2xl border border-solid border-[#ffffff61] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-[26px] hover:opacity-90">
                Sign Up Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

