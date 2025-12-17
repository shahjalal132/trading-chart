import { Button } from "@/components/ui/button";
import React from "react";
import GradientButton from "../GradientButton";

export default function Marketing() {
  return (
    <section className="relative w-full px-15">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-25 items-center">
          <div className="flex justify-center lg:justify-start">
            <img
              className="w-full max-w-[693px] h-auto"
              alt="Mask group"
              src="/assets/images/marketing.png"
            />
          </div>

          <div className="flex flex-col gap-8 lg:gap-10">
            <div className="flex flex-col gap-8 lg:gap-10">
              <h1 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-white text-4xl sm:text-5xl lg:text-[80px] tracking-[0] leading-tight lg:leading-[93px]">
                Join 10k+ Students in Trading Chart
              </h1>

              <h3 className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-white text-lg lg:text-[30px] tracking-[0] leading-relaxed lg:leading-[42px]">
                Learn Trading The Simplex Way From Robin.
              </h3>
            </div>

            <p className="[font-family:'Helvetica_Neue-Medium',Helvetica] font-medium text-white text-lg sm:text-xl tracking-[0] leading-[30px]">
              Trading is not about being right—it's about managing <br/> what
              happens when you're wrong.
            </p>

            <div className="flex flex-wrap gap-6 lg:gap-[30px]">
             <GradientButton variant="green" href="/enroll" className="px-8 py-3 font-semibold">Enroll Now</GradientButton>
             <GradientButton variant="red" href="/learn" className="px-8 py-3 font-semibold">Learn More</GradientButton>
            </div>
          </div>
        </div>

        <footer className="mt-6">
          <p className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-white text-xl sm:text-2xl lg:text-[32px] tracking-[0] leading-relaxed lg:leading-[42px]">
            I'm success. I'm ready to serve you <br/> my services
          </p>
        </footer>
      </div>
    </section>
  );
}
