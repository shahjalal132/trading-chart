import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import courseData from '@/data/course-details.json';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import React from 'react';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

export default function FAQ(): React.JSX.Element {
    const faqs: FAQItem[] = courseData.faqs || [];

    return (
        <section className="w-full px-4 py-16 md:py-20">
            <div className="container mx-auto">
                <div className="flex flex-col items-center">
                    {/* Header */}
                    <h2 className="mb-12 text-center text-4xl leading-tight font-bold md:text-5xl">
                        Frequently Asked
                        <br />
                        Questions
                    </h2>

                    {/* FAQ Grid */}
                    <Accordion
                        type="single"
                        collapsible
                        className="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
                    >
                        {faqs.map((faq) => (
                            <AccordionItem
                                key={faq.id}
                                value={faq.id.toString()}
                                className={cn(
                                    'rounded-4xl border transition-all',
                                    'border-[#363636] bg-[#0d0d0d]',
                                    'data-[state=open]:bg-opacity-20 data-[state=open]:border-[#363636] data-[state=open]:bg-[#0d0d0d]',
                                    ' border-b-0',
                                )}
                            >
                                <AccordionTrigger
                                    className={cn(
                                        'flex w-full items-start justify-between gap-4 p-5 text-left',
                                        'hover:no-underline [&>svg]:hidden',
                                        'data-[state=open]:border-b data-[state=open]:border-[#363636]',
                                        'data-[state=open]:bg-gradient-to-b data-[state=open]:from-[#188100] data-[state=open]:to-[#011903]',
                                        '[&_.faq-icon]:bg-gray-700',
                                        '[&[data-state=open]_.faq-icon]:bg-white',
                                        '[&_.faq-plus-icon]:block [&[data-state=open]_.faq-plus-icon]:hidden',
                                        '[&_.faq-minus-icon]:hidden [&[data-state=open]_.faq-minus-icon]:block',
                                        'hover:cursor-pointer'
                                    )}
                                >
                                    <span className="jalal3 pr-4 text-sm font-medium md:text-base">
                                        {faq.id}. {faq.question}
                                    </span>
                                    <div className="faq-icon jalal4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all">
                                        <Plus className="faq-plus-icon h-5 w-5 text-white" />
                                        <Minus className="faq-minus-icon h-5 w-5 text-gray-700" />
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pt-6 pb-6">
                                    <p className="text-lg leading-relaxed font-medium text-[#afafaf]">
                                        {faq.answer}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
