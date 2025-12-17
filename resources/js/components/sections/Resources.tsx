import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ResourcesData {
  title: string;
  features: string[];
  price: string;
}

const resourcesData: ResourcesData[] = [
  {
    title: "CONSULTATION",
    features: [
      "Trading guidance and Investments",
      "Strategy Improvement",
      "Risk management advice",
      "Beginner assistance",
      "Mentorship support",
      "Trading psychology tips",
    ],
    price: "$50",
  },
  {
    title: "TRADE WITH ME",
    features: [
      "Real time market analysis",
      "Live trade with high accuracy",
      "Entry exit plan",
      "24/7 Support",
      "Copy my every trades",
      "Risk management like me",
      "25% Growth per session",
    ],
    price: "Free",
  },
  {
    title: "COURSE",
    features: [
      "Basic to advance",
      "Price action",
      "SMC / ICT and many proven trading strategies",
      "Classes: 15 live sessions via Google meet",
      "Time: Classes will start at 9:00 p.m. (Bangladesh time)",
      "All the classes will be recorded for your practice and review",
    ],
    price: "$900",
  },
  {
    title: "FREE LIVE TRIALS",
    features: [
      "Live Trades",
      "Copy my Trade",
      "Entry exit",
      "Aftermarket analysis and review",
      "Trades management",
    ],
    price: "Free",
  },
];

export default function Resources() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Wait for cards to be rendered
    const validCards = cardsRef.current.filter((card) => card !== null);
    if (validCards.length === 0) return;

    // Set initial states
    gsap.set(validCards, { opacity: 0, y: 100 });

    // Scroll reveal animation
    gsap.to(validCards, {
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

    // Hover effects for each card
    cardsRef.current.forEach((card) => {
      if (!card) return;

      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          boxShadow: '0 25.6px 57.6px 0 rgba(237, 0, 0, 0.4), 0 4.8px 14.4px 0 rgba(237, 0, 0, 0.3), 0 0 0 1px rgba(237, 0, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          boxShadow: 'none',
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
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
      className="w-full min-h-screen flex items-center justify-center px-4"
    >
      <div className="w-full max-w-[1621px] flex flex-col items-center">
        <h1 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-white text-5xl md:text-[80px] text-center tracking-[0] leading-tight mb-10">
          Your Resources
        </h1>

        <p className="[font-family:'Hellix-Regular',Helvetica] font-normal text-white text-lg md:text-xl text-center tracking-[0] leading-[31px] mb-12">
          One of the world&apos;s most popular multi-asset brokers.
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {resourcesData.map((resource, index) => (
            <Card
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="bg-[#121212] rounded-[19px] border-[3px] border-solid border-[#ffffff36] flex flex-col cursor-pointer"
            >
              <CardContent className="flex flex-col p-6 flex-1">
                <h2 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-white text-2xl md:text-[32px] tracking-[0] leading-[38px] mb-8 text-center md:text-left">
                  {resource.title}
                </h2>

                <ul className="flex flex-col gap-4">
                  {resource.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3.5">
                      <div className="mt-1 min-w-[5px] w-[5px] h-[5px] bg-[#ffffff70] rounded-[2.5px]" />
                      <span className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-base tracking-[0] leading-7">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full mt-10 md:mt-20 h-auto px-[30px] py-[21px] rounded-2xl border border-solid border-[#ffffff61] bg-[linear-gradient(180deg,rgba(237,0,0,1)_0%,rgba(37,1,1,1)_100%)] hover:opacity-90 transition-opacity hover:cursor-pointer">
                  <span className="[font-family:'Poppins-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-[26px] whitespace-nowrap">
                    Get Started Now
                  </span>
                </Button>

                <div className="flex flex-col gap-5 mt-9">
                  <span className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-base tracking-[0] leading-7">
                    Course price
                  </span>
                  <span className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-white text-4xl md:text-[56px] tracking-[0] leading-[38px]">
                    {resource.price}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
