import { router } from '@inertiajs/react';
import { cn } from '@/lib/utils';

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
    const gradientStyle =
        variant === 'green'
            ? `linear-gradient(180deg, var(--gradient-green-start) 0%, var(--gradient-green-end) 100%)`
            : `linear-gradient(180deg, var(--gradient-red-start) 0%, var(--gradient-red-end) 100%)`;

    const handleClick = () => {
        router.visit(href);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={cn(
                'inline-flex items-center justify-center rounded-2xl border border-[var(--border-medium)] text-white transition-opacity hover:opacity-90',
                className
            )}
            style={{
                background: gradientStyle,
            }}
        >
            {children}
        </button>
    );
}

