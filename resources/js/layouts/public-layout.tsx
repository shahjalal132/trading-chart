import Footer from '@/components/sections/Footer';
import Header from '@/components/sections/Header';
import TradingBackground from '@/components/TradingBackground';
import { type ReactNode } from 'react';

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black">
            <TradingBackground />
            <Header />
            <main className="relative z-10 flex flex-col">{children}</main>
            <Footer />
        </div>
    );
}

