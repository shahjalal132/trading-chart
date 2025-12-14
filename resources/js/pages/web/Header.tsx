import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ChevronDown } from "lucide-react";
import React from "react";

const navigationItems = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Services", href: "#", hasDropdown: true },
  { label: "Platforms", href: "#" },
  { label: "Contacts", href: "#" },
];

export default function Header(): React.JSX.Element {
  return (
    <header className="w-full h-[95px] flex items-center bg-[#000400] px-[220px]">
      <div className="flex items-center gap-[9.2px]">
        <img
          className="w-[73.59px] h-[82.25px]"
          alt="Trading platform logo icon"
          src="/placeholder-logo-icon.png"
        />
        <img
          className="w-[157.2px] h-[41.56px]"
          alt="Trading chart logo"
          src="/placeholder-logo-text.png"
        />
      </div>

      <NavigationMenu className="flex-1 mx-auto max-w-[475.19px]">
        <NavigationMenuList className="flex gap-[31px]">
          {navigationItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuLink
                href={item.href}
                className="flex items-center gap-1 [font-family:'DM_Sans-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-7 whitespace-nowrap hover:opacity-80 transition-opacity"
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown className="w-[8.18px] h-[5px]" />
                )}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex gap-3.5">
        <Button className="w-[102px] h-[43px] bg-[linear-gradient(180deg,rgba(24,129,0,1)_0%,rgba(1,25,3,1)_100%)] rounded-2xl border border-solid border-[#ffffff61] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-[26px] hover:opacity-90 transition-opacity">
          Log In
        </Button>
        <Button className="w-[116px] h-[43px] bg-[linear-gradient(180deg,rgba(237,0,0,1)_0%,rgba(37,1,1,1)_100%)] rounded-2xl border border-solid border-[#ffffff61] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-[26px] hover:opacity-90 transition-opacity">
          Sign Up
        </Button>
      </div>
    </header>
  );
}
