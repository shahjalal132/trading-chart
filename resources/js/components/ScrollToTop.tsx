import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setIsVisible(scrollTop > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (buttonElement) {
            if (isVisible) {
                gsap.to(buttonElement, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            } else {
                gsap.to(buttonElement, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
        }
    }, [isVisible, buttonElement]);

    useEffect(() => {
        if (buttonElement) {
            gsap.set(buttonElement, { opacity: 0, scale: 0.8 });
        }
    }, [buttonElement]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            ref={setButtonElement}
            onClick={scrollToTop}
            className={`fixed bottom-24 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gradient-red-start)] to-[var(--gradient-red-end)] shadow-lg transition-all duration-300 hover:cursor-pointer hover:scale-110 hover:shadow-xl ${
                isVisible ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            aria-label="Scroll to top"
        >
            <ArrowUp className="h-6 w-6 text-white" />
        </button>
    );
}

