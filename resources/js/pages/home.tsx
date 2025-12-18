import Accounts from '@/components/sections/Accounts';
import Community from '@/components/sections/Community';
import Contact from '@/components/sections/Contact';
import Counter from '@/components/sections/Counter';
import Hero from '@/components/sections/Hero';
import Marketing from '@/components/sections/Marketing';
import Resources from '@/components/sections/Resources';
import Trade from '@/components/sections/Trade';
import Video from '@/components/sections/Video';
import WebLayout from '@/layouts/web-layout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Home(): React.JSX.Element {
    return (
        <WebLayout>
            <Head title="Home" />
            {/* Hero section background */}
            <div className="relative z-10">
                <div
                    className="flex min-h-screen md:min-h-[70vh] lg:min-h-screen items-center pb-24 bg-fill bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/assets/images/hero-bg.jpg')",
                    }}
                >
                    <div className="container mx-auto w-full px-4 md:px-20">
                        <Hero />
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex flex-col">
                <div className="container mx-auto w-full py-30">
                    <Counter />
                </div>
                <div className="container mx-auto w-full">
                    <Resources />
                </div>
                <div className="container mx-auto py-30 w-full">
                    <Trade />
                </div>
                <div className="container mx-auto w-full">
                    <Contact />
                </div>
                <div className="container mx-auto py-30 w-full">
                    <Marketing />
                </div>
                <div className="container mx-auto w-full">
                    <Accounts />
                </div>
                <div className="container mx-auto w-full py-30">
                    <Video />
                </div>
                <div className="container mx-auto pb-20 w-full">
                    <Community />
                </div>
            </div>
        </WebLayout>
    );
}
