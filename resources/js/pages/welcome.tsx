import Hero from "./web/Hero";
import React from "react";
import Contact from "./web/Contact";

import Resources from "./web/Resources";
import Header from "./web/Header";
import Platforms from "./web/Platforms";
import Footer from "./web/Footer";

const HomeEnglish = (): React.JSX.Element => {
  return (
    <div className="bg-black overflow-hidden w-full relative">
      <div className="absolute top-[1527px] left-[1262px] w-[505px] h-[505px] bg-[#cd010170] rounded-[252.5px] blur-[214.8px] pointer-events-none" />

      <div className="absolute top-[3005px] left-[19px] w-[505px] h-[505px] bg-[#cd010170] rounded-[252.5px] blur-[214.8px] pointer-events-none" />

      <div className="absolute top-[3594px] left-[1407px] w-[505px] h-[505px] bg-[#f2c1314c] rounded-[252.5px] blur-[214.8px] pointer-events-none" />

      <div className="absolute top-[95px] left-0 w-full h-[897px] bg-[#000400] pointer-events-none" />

      {/* <img
        className="absolute top-[95px] left-[969px] w-[951px] h-[896px] aspect-[1.06] object-cover pointer-events-none"
        alt="Whatsapp image"
        src="/whatsapp-image-2025-12-02-at-10-26-30-PM-1.png"
      /> */}

      <div className="relative w-full">
        <Header />
        <Hero />
        <Resources/>
        <Platforms />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default HomeEnglish;
