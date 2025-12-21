import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';

interface CourseItem {
    name: string;
    quantity: number;
    price: number;
}

export default function Checkout(): React.JSX.Element {
    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        streetAddress: '',
        country: '',
        apartment: '',
        town: '',
        county: '',
        postcode: '',
        phone: '',
        email: '',
        notes: '',
    });

    // Payment method state
    const [paymentMethod, setPaymentMethod] = useState('direct-bank-transfer');

    // Course items data
    const courseItems: CourseItem[] = [
        { name: 'Course No 01.', quantity: 1, price: 65.0 },
        { name: 'Course No 02.', quantity: 1, price: 35.0 },
        { name: 'Course No 02.', quantity: 1, price: 50.0 },
    ];

    // Calculate total
    const total = courseItems.reduce((sum, item) => sum + item.price, 0);

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
        console.log('Checkout submitted:', { formData, paymentMethod });
        // Add your checkout logic here
    };

    return (
        <section className="w-full px-4">
            <div className="container mx-auto">
                {/* Coupon Banner */}
                <div className="mb-8 flex items-center gap-3 rounded border-b-4 border-red-500 bg-linear-to-r from-red-900/40 to-transparent p-4 px-8">
                    <div className="">
                        <img
                            src="/assets/icons/coupon.png"
                            alt="Coupon"
                            className="h-6 w-6"
                        />
                    </div>
                    <div>
                        <span className="text-base font-medium text-white">
                            Have a coupon?{' '}
                        </span>
                        <button
                            type="button"
                            className="ml-1 text-base font-medium text-red-500 underline hover:cursor-pointer hover:text-white"
                        >
                            click here to enter your code
                        </button>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Billing Details Form */}
                    <div>
                        <h2 className="mb-6 font-['Helvetica_Neue-Bold',Helvetica] text-[32px] font-bold">
                            Billing details
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* First and Last Name Row */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First name"
                                    required
                                    className="rounded border border-[#363636] bg-transparent px-4 py-6 text-base font-medium text-[#8c8c8c] placeholder-[#8c8c8c] transition-colors focus:border-red-500 focus:outline-none"
                                />
                                <Input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last name"
                                    required
                                    className="rounded border border-[#363636] bg-transparent px-4 py-6 text-base font-medium text-[#8c8c8c] placeholder-[#8c8c8c] transition-colors focus:border-red-500 focus:outline-none"
                                />
                            </div>

                            {/* Company Name */}
                            <Input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                placeholder="Company name (optional)"
                                className="w-full rounded border border-[#363636] bg-transparent px-4 py-6 text-base font-medium text-[#8c8c8c] placeholder-[#8c8c8c] transition-colors focus:border-red-500 focus:outline-none"
                            />

                            {/* Street Address */}
                            <Input
                                type="text"
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={handleInputChange}
                                placeholder="House number and street name"
                                required
                                className="w-full rounded border border-[#363636] bg-transparent px-4 py-6 text-base font-medium text-[#8c8c8c] placeholder-[#8c8c8c] transition-colors focus:border-red-500 focus:outline-none"
                            />

                            {/* Country */}
                            <Input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                placeholder="United Kingdom (UK)"
                                required
                                className="w-full rounded border border-[#363636] bg-transparent px-4 py-6 text-base font-medium text-[#8c8c8c] placeholder-[#8c8c8c] transition-colors focus:border-red-500 focus:outline-none"
                            />

                            {/* Apartment */}
                            <Input
                                type="text"
                                name="apartment"
                                value={formData.apartment}
                                onChange={handleInputChange}
                                placeholder="Apartment, suite, unit, etc. (optional)"
                                className="w-full rounded border border-[#363636] bg-transparent px-4 py-6 text-base font-medium text-[#8c8c8c] placeholder-[#8c8c8c] transition-colors focus:border-red-500 focus:outline-none"
                            />

                            {/* Town and County Row */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input
                                    type="text"
                                    name="town"
                                    value={formData.town}
                                    onChange={handleInputChange}
                                    placeholder="Town / City *"
                                    required
                                    className="rounded border border-[#363636] bg-transparent px-4 py-6 text-base font-medium text-[#8c8c8c] placeholder-[#8c8c8c] transition-colors focus:border-red-500 focus:outline-none"
                                />
                                <Input
                                    type="text"
                                    name="county"
                                    value={formData.county}
                                    onChange={handleInputChange}
                                    placeholder="County (optional)"
                                    className="rounded border border-[#363636] bg-transparent px-4 py-6 text-base font-medium text-[#8c8c8c] placeholder-[#8c8c8c] transition-colors focus:border-red-500 focus:outline-none"
                                />
                            </div>

                            {/* Postcode */}
                            <Input
                                type="text"
                                name="postcode"
                                value={formData.postcode}
                                onChange={handleInputChange}
                                placeholder="Postcode *"
                                required
                                className="w-full rounded border border-[#363636] bg-transparent px-4 py-6 text-base font-medium text-[#8c8c8c] placeholder-[#8c8c8c] transition-colors focus:border-red-500 focus:outline-none"
                            />

                            {/* Phone and Email Row */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone number"
                                    className="rounded border border-[#363636] bg-transparent px-4 py-6 text-base font-medium text-[#8c8c8c] placeholder-[#8c8c8c] transition-colors focus:border-red-500 focus:outline-none"
                                />
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Your email"
                                    required
                                    className="rounded border border-[#363636] bg-transparent px-4 py-6 text-base font-medium text-[#8c8c8c] placeholder-[#8c8c8c] transition-colors focus:border-red-500 focus:outline-none"
                                />
                            </div>

                            {/* Additional Information */}
                            <div className="mt-6">
                                <h3 className="mb-4 text-xl font-bold">
                                    Additional information
                                </h3>
                                <Textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    placeholder="Notes about your order, e.g. special notes for delivery."
                                    rows={5}
                                    className="w-full resize-none rounded border border-[#363636] bg-transparent px-4 py-6 text-base font-medium text-[#8c8c8c] placeholder-[#8c8c8c] transition-colors focus:border-red-500 focus:outline-none"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Your Order Section */}
                    <div>
                        <h2 className="mb-6 font-['Helvetica_Neue-Bold',Helvetica] text-[32px] font-bold">
                            Your Order
                        </h2>

                        {/* Course Listing */}
                        <div className="mb-10 bg-[#121212] rounded-xl border-2 py-4 pl-6 pr-10">
                            <div className="flex items-center justify-between">
                                <h3 className="mb-4 text-[22px] font-bold">
                                    Course Listing
                                </h3>
                                <h4 className="mb-4 text-lg font-bold">
                                    Subtotal
                                </h4>
                            </div>

                            <div className='border-b mb-4 border-[#363636]'></div>

                            {/* Course Items */}
                            <div className="space-y-5">
                                {courseItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between border-b border-[#363636] pb-5 text-lg font-medium text-[#b1b1b1]"
                                    >
                                        <span>
                                            {item.name} × {item.quantity}
                                        </span>
                                        <span className="text-lg font-medium text-[#b1b1b1]">
                                            ${item.price.toFixed(2)}
                                        </span>
                                    </div>
                                ))}

                                {/* Total */}
                                <div className="flex items-center justify-between text-xl font-bold">
                                    <span>Total:</span>
                                    <span className="text-red-500">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="mb-6 bg-[#121212] rounded-xl border-2 py-4 pl-6 pr-10 space-y-4">
                            {/* Direct Bank Transfer */}
                            <div className="rounded-lg bg-gray-800 p-4">
                                <label className="mb-3 flex cursor-pointer items-center gap-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="direct-bank-transfer"
                                        checked={
                                            paymentMethod ===
                                            'direct-bank-transfer'
                                        }
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="h-5 w-5 text-red-500"
                                    />
                                    <span className="font-semibold">
                                        Direct bank transfer
                                    </span>
                                </label>
                                <p className="ml-8 text-sm text-gray-400">
                                    Make your payment directly into our bank
                                    account. Please use your Order ID as the
                                    payment reference. Your order will not be
                                    shipped until the funds have cleared in our
                                    account.
                                </p>
                            </div>

                            {/* Check Payments */}
                            <label className="hover:bg-gray-750 flex cursor-pointer items-center gap-3 rounded-lg bg-gray-800 p-4 transition-colors">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="check-payments"
                                    checked={paymentMethod === 'check-payments'}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                    className="h-5 w-5 text-red-500"
                                />
                                <span className="font-semibold">
                                    Check payments
                                </span>
                            </label>

                            {/* Cash on Delivery */}
                            <label className="hover:bg-gray-750 flex cursor-pointer items-center gap-3 rounded-lg bg-gray-800 p-4 transition-colors">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cash-on-delivery"
                                    checked={
                                        paymentMethod === 'cash-on-delivery'
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                    className="h-5 w-5 text-red-500"
                                />
                                <span className="font-semibold">
                                    Cash on deliver
                                </span>
                            </label>

                            {/* PayPal */}
                            <div className="rounded-lg bg-gray-800 p-4">
                                <label className="flex cursor-pointer items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="paypal"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={(e) =>
                                                setPaymentMethod(e.target.value)
                                            }
                                            className="h-5 w-5 text-red-500"
                                        />
                                        <span className="font-semibold">
                                            PayPal
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                                            alt="PayPal"
                                            className="h-4"
                                        />
                                        <div className="flex gap-1">
                                            <div className="h-5 w-8 rounded bg-blue-600"></div>
                                            <div className="h-5 w-8 rounded bg-orange-500"></div>
                                            <div className="h-5 w-8 rounded bg-blue-400"></div>
                                        </div>
                                        <button
                                            type="button"
                                            className="text-xs text-red-400 hover:text-red-300"
                                        >
                                            What is PayPal?
                                        </button>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Privacy Policy */}
                        <p className="mb-6 text-sm text-gray-400">
                            Your personal data will be used to process your
                            order, support your experience throughout this
                            website, and for other purposes described in our
                            privacy policy.
                        </p>

                        {/* Place Order Button */}
                        <button
                            type="button"
                            onClick={() => {
                                const form = document.querySelector('form');
                                if (form) {
                                    form.requestSubmit();
                                }
                            }}
                            className="w-full rounded-lg bg-green-600 py-4 font-bold text-white transition-colors hover:bg-green-700"
                        >
                            Place Your Order
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
