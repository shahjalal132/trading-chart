import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ChevronDown } from "lucide-react";
import React from "react";
import AppLogo from "../AppLogo";
import AppLogoIcon from "../app-logo-icon";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const services: NavItem[] = [
  { label: "Service 1", href: "#" },
  { label: "Service 2", href: "#" },
  { label: "Service 3", href: "#" },
];

const navigationItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Platforms", href: "/platforms" },
  { label: "Contacts", href: "/contacts" },
];

export default function Header(): React.JSX.Element {
  return (
    <header className="w-full h-[95px] flex items-center bg-[var(--header-bg)] px-4 md:px-[220px]">
      <AppLogo src="/assets/images/logo.png" />
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
        <Button className="w-[102px] h-[43px] rounded-2xl border border-solid border-[var(--border-medium)] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-[26px] hover:opacity-90 transition-opacity" style={{ background: `linear-gradient(180deg, var(--gradient-green-start) 0%, var(--gradient-green-end) 100%)` }}>
          Log In
        </Button>
        <Button className="w-[116px] h-[43px] rounded-2xl border border-solid border-[var(--border-medium)] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-[26px] hover:opacity-90 transition-opacity" style={{ background: `linear-gradient(180deg, var(--gradient-red-start) 0%, var(--gradient-red-end) 100%)` }}>
          Sign Up
        </Button>
      </div>
    </header>
  );
}
