import { Separator } from "@/components/ui/separator";
import { ChevronRight, Mail, Phone } from "lucide-react";
import React from "react";

const quickLinks = [
  { label: "Services", href: "#" },
  { label: "Platform", href: "#" },
  { label: "Social", href: "#" },
];

const contactPhones = ["+88 (09) 53 33 09", "+88 (09) 53 33 09"];

const socialIcons = [
  { src: "", alt: "Social Icon 1" },
  { src: "", alt: "Social Icon 2" },
  { src: "", alt: "Social Icon 3" },
  { src: "", alt: "Social Icon 4" },
  { src: "", alt: "Social Icon 5" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--footer-bg)] text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <img
                src=""
                alt="Trading Chart Logo"
                className="w-[99px] h-[111px]"
              />
              <img
                src=""
                alt="Trading Chart Text"
                className="w-[212px] h-[56px]"
              />
            </div>
            <p className="text-white/80 text-xl leading-[31px] font-normal">
              I am deeply committed to every student, which is why I regularly
              provide feedback, market updates, signal guidelines, and personal
              corrections. I always teach using updated market trends, data
              analytics, and modern trading techniques so that.
            </p>
          </div>

          <div className="lg:col-span-1 flex justify-center">
            <div className="flex flex-col items-center h-full">
              <Separator
                orientation="vertical"
                className="w-px h-full bg-white/20"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[22px] font-bold mb-12 leading-10">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-8">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="flex items-center gap-2 text-white/80 text-base hover:text-white transition-colors"
                >
                  <div className="flex gap-1">
                    <ChevronRight className="w-3 h-3" />
                    <ChevronRight className="w-3 h-3 -ml-2" />
                  </div>
                  <span>{link.label}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-1 flex justify-center">
            <div className="flex flex-col items-center h-full">
              <Separator
                orientation="vertical"
                className="w-px h-full bg-white/20"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[22px] font-bold mb-12 leading-10">
              Contact Us
            </h3>
            <div className="flex flex-col gap-[59px]">
              <div className="flex gap-3">
                <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-white/80 text-base">Call Us</span>
                  {contactPhones.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone}`}
                      className="text-white text-lg tracking-[0.18px] leading-8 hover:text-white/80 transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-white/80 text-base">Mail Us</span>
                  <a
                    href="mailto:tradingchart@gmail.com"
                    className="text-white text-lg tracking-[0.18px] leading-8 hover:text-white/80 transition-colors"
                  >
                    tradingchart@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          {socialIcons.map((icon, index) => (
            <a
              key={index}
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <img src={icon.src} alt={icon.alt} className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
