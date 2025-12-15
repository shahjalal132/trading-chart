import Hero from "@/components/sections/Hero";
import React from "react";
import Contact from "@/components/sections/Contact";
import Resources from "@/components/sections/Resources";
import Header from "@/components/sections/Header";
import Platforms from "@/components/sections/Platforms";
import Footer from "@/components/sections/Footer";

export default function Home(): React.JSX.Element {
  return (
    <div className="bg-black overflow-hidden w-full min-h-screen relative">
      {/* Background blur effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[40%] right-[20%] w-[505px] h-[505px] bg-[var(--blur-red)] rounded-[252.5px] blur-[214.8px] opacity-50" />
        <div className="absolute top-[70%] left-[2%] w-[505px] h-[505px] bg-[var(--blur-red)] rounded-[252.5px] blur-[214.8px] opacity-50" />
        <div className="absolute top-[85%] right-[10%] w-[505px] h-[505px] bg-[var(--blur-yellow)] rounded-[252.5px] blur-[214.8px] opacity-50" />
      </div>

      {/* Hero section background */}
      <div className="relative z-10">
        <div className="absolute top-0 left-0 w-full h-[897px] bg-[var(--header-bg)] pointer-events-none" />

        <div className="relative w-full flex flex-col">
          <Header />
          <div className="bg-[var(--header-bg)] pb-24 min-h-[897px] flex items-center">
            <div className="container mx-auto px-4 md:px-[220px] w-full">
              <Hero />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col">
        <div className="container mx-auto w-full">
          <Resources />
        </div>
        <div className="container mx-auto w-full">
          <Platforms />
        </div>
        <div className="container mx-auto w-full">
          <Contact />
        </div>
        <Footer />
      </div>
    </div>
  );
};

