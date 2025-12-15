import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export default function AppLogo({
    className,
    href,
    src,
}: {
    className?: string;
    href?: string;
    src: string;
}) {
    return (
        <Link
            href={href ?? '/'}
            className={cn('flex items-center gap-[9.2px]', className)}
        >
            <img
                className="h-[41.56px] w-[157.2px]"
                alt="Trading chart logo"
                src={src}
            />
        </Link>
    );
}
