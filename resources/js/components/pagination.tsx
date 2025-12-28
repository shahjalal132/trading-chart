import {
    Pagination as PaginationRoot,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { router } from '@inertiajs/react';

export interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface PaginationProps {
    pagination: PaginationData;
    /**
     * Function to generate the URL for a given page number
     * @param page - The page number
     * @returns The URL string for that page
     */
    getPageUrl: (page: number) => string;
    /**
     * Optional label for the items being paginated (e.g., "courses", "users", "posts")
     * Used in the "Showing X-Y of Z" message
     * @default "items"
     */
    itemLabel?: string;
    /**
     * Whether to show the "Showing X-Y of Z" message
     * @default true
     */
    showInfo?: boolean;
    /**
     * Number of pages to show on each side of the current page
     * @default 2
     */
    delta?: number;
}

export default function Pagination({
    pagination,
    getPageUrl,
    itemLabel = 'items',
    showInfo = true,
    delta = 2,
}: PaginationProps) {
    const { current_page, last_page, per_page, total } = pagination;

    // Don't render if there's only one page
    if (last_page <= 1) {
        return null;
    }

    // Calculate showing range
    const start = (current_page - 1) * per_page + 1;
    const end = Math.min(current_page * per_page, total);

    // Generate page numbers to display
    const generatePageNumbers = (): (number | 'ellipsis')[] => {
        const pages: (number | 'ellipsis')[] = [];
        const current = current_page;
        const last = last_page;

        // Always show first page
        if (current > delta + 2) {
            pages.push(1);
            if (current > delta + 3) {
                pages.push('ellipsis');
            }
        }

        // Show pages around current page
        for (let i = Math.max(1, current - delta); i <= Math.min(last, current + delta); i++) {
            pages.push(i);
        }

        // Always show last page
        if (current < last - delta - 1) {
            if (current < last - delta - 2) {
                pages.push('ellipsis');
            }
            pages.push(last);
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();

    const handlePageClick = (page: number, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        router.get(getPageUrl(page));
    };

    return (
        <div className="mt-6">
            {showInfo && (
                <div className="mb-4 text-sm text-muted-foreground">
                    Showing {start}-{end} of {total} {itemLabel}
                </div>
            )}
            <PaginationRoot>
                <PaginationContent>
                    <PaginationItem>
                        {current_page > 1 ? (
                            <PaginationPrevious
                                href={getPageUrl(current_page - 1)}
                                onClick={(e) => handlePageClick(current_page - 1, e)}
                            />
                        ) : (
                            <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
                        )}
                    </PaginationItem>

                    {pageNumbers.map((page, index) => (
                        <PaginationItem key={index}>
                            {page === 'ellipsis' ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    href={getPageUrl(page)}
                                    isActive={page === current_page}
                                    onClick={(e) => handlePageClick(page, e)}
                                >
                                    {page}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        {current_page < last_page ? (
                            <PaginationNext
                                href={getPageUrl(current_page + 1)}
                                onClick={(e) => handlePageClick(current_page + 1, e)}
                            />
                        ) : (
                            <PaginationNext href="#" className="pointer-events-none opacity-50" />
                        )}
                    </PaginationItem>
                </PaginationContent>
            </PaginationRoot>
        </div>
    );
}

