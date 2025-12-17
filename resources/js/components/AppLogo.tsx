import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export default function AppLogo({
    className,
    href,
    src = '/assets/images/logo.png',
}: {
    className?: string;
    href?: string;
    src?: string;
}) {
    return (
        <Link
            href={href ?? '/'}
            className={cn('flex items-center gap-[9.2px]', className)}
        >
            <img
                className="h-[42px] w-[158px]"
                alt="Trading chart logo"
                src={src}
            />
        </Link>
    );
}
