import { router } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface GradientButtonProps {
    variant: 'green' | 'red';
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function GradientButton({
    variant,
    href,
    children,
    className,
}: GradientButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const gradientStyle =
        variant === 'green'
            ? `linear-gradient(180deg, var(--gradient-green-start) 0%, var(--gradient-green-end) 100%)`
            : `linear-gradient(180deg, var(--gradient-red-start) 0%, var(--gradient-red-end) 100%)`;

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseEnter = () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.2,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out',
            });
        };

        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mouseenter', handleMouseEnter);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const handleClick = () => {
        router.visit(href);
    };

    const baseClasses = variant === 'green' 
        ? 'bg-gradient-to-b from-[var(--gradient-green-start)] to-[var(--gradient-green-end)]'
        : 'bg-gradient-to-b from-[var(--gradient-red-start)] to-[var(--gradient-red-end)]';

    return (
        <button
            ref={buttonRef}
            type="button"
            onClick={handleClick}
            className={cn(
                'inline-flex items-center justify-center rounded-2xl border border-[var(--border-medium)] text-white transition-all duration-200 hover:cursor-pointer',
                baseClasses,
                className
            )}
        >
            {children}
        </button>
    );
}

