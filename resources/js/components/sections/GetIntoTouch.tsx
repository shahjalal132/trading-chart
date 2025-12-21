import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';
import React, { useState } from 'react';
import GradientButton from '../GradientButton';

interface ContactCardData {
    icon: LucideIcon;
    label: string;
    value: string;
}

export default function GetIntoTouch(): React.JSX.Element {
    // Contact info cards data
    const contactCards: ContactCardData[] = [
        {
            icon: Phone,
            label: 'Call Us 7/24',
            value: '+208-555-0112',
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'Elgin St. Celina, NY 10299',
        },
        {
            icon: Mail,
            label: 'Make a Quote',
            value: 'tradingchart@gmail.com',
        },
    ];

    // Contact form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    // Handle form input changes
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
        });
    };

    return (
        <section className="w-full px-4">
            <div className="container mx-auto">
                {/* Contact Info Cards */}
                <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {contactCards.map((card, index) => {
                        const IconComponent = card.icon;
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-4 rounded-3xl bg-gradient-to-br from-[#ED0000] to-[#250101] px-9 py-13"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white">
                                    <IconComponent className="h-6 w-6 text-[#353535]" />
                                </div>
                                <div>
                                    <div className="mb-1 text-[14px] font-medium text-white opacity-90">
                                        {card.label}
                                    </div>
                                    <div className="text-lg font-bold text-white">
                                        {card.value}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Contact Form and Map */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Contact Form */}
                    <div className="rounded-2xl bg-[#262626] p-8">
                        <h2 className="mb-6 font-['Helvetica_Neue-Bold',Helvetica] text-[48px] font-bold">
                            Get In Touch
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name and Email Row */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Your Name"
                                    required
                                    className="rounded-xl border border-gray-700 bg-transparent px-4 py-6 text-2xl font-semibold text-white placeholder-[#bcbcbc] transition-colors focus:border-green-500"
                                />
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email Address"
                                    required
                                    className="rounded-xl border border-gray-700 bg-transparent px-4 py-6 text-2xl font-semibold text-white placeholder-[#bcbcbc] transition-colors focus:border-green-500"
                                />
                            </div>

                            {/* Phone and Subject Row */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    className="rounded-xl border border-gray-700 bg-transparent px-4 py-6 text-2xl font-semibold text-white placeholder-[#bcbcbc] transition-colors focus:border-green-500"
                                />
                                <Input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder="Select Subject"
                                    className="rounded-xl border border-gray-700 bg-transparent px-4 py-6 text-2xl font-semibold text-white placeholder-[#bcbcbc] transition-colors focus:border-green-500"
                                />
                            </div>

                            {/* Message Textarea */}
                            <Textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Write message..."
                                rows={5}
                                required
                                className="w-full resize-none rounded-xl border border-gray-700 bg-transparent px-4 py-6 text-2xl font-semibold text-white placeholder-[#bcbcbc] transition-colors focus:border-green-500"
                            />

                            {/* Submit Button */}
                            <GradientButton
                                variant="green"
                                href="/contact"
                                className="mt-4 px-8 py-3 font-semibold hover:cursor-pointer"
                            >
                                Request A Call
                            </GradientButton>
                        </form>
                    </div>

                    {/* Map Section */}
                    <div className="relative overflow-hidden rounded-2xl bg-gray-900 p-4">
                        <div className="relative h-full min-h-[400px] w-full rounded-lg overflow-hidden">
                            {/* Google Maps Embed */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184133389887!2d-73.98566468459418!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sElgin%20St%2C%20New%20York%2C%20NY%2010299%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 h-full w-full"
                                title="Location Map"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
