import Footer from '@/components/sections/Footer';
import Header from '@/components/sections/Header';
import TradingBackground from '@/components/TradingBackground';
import { type ReactNode } from 'react';

interface WebLayoutProps {
    children: ReactNode;
}

export default function WebLayout({ children }: WebLayoutProps) {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black">
            <TradingBackground />
            <Header />
            <main className="relative z-10 flex flex-col">{children}</main>
            <Footer />
        </div>
    );
}

