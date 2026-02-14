import React from 'react';
import {getAddressById} from "@/app/action/getAddress";
import {Address} from "@/app/types/interfaces";
import {MapPin, Globe, Mail} from "lucide-react"; // Optional: Use Lucide icons for flair

interface PageProps {
    params: Promise<{ id: string }>
}

const AddressesPage: React.FC<PageProps> = async ({params}) => {
    const {id} = await params;
    const addresses: Address[] | null = await getAddressById(id);
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-end border-b pb-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Addresses Directory
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Showing {addresses?.length || 0} registered locations
                        </p>
                    </div>
                </header>

                {addresses && addresses.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {addresses.map((address, index) => (
                            <div
                                key={index}
                                className="group relative bg-white
                                border border-gray-200 rounded-xl p-6 shadow-sm
                                hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                        <Globe size={20}/>
                                    </div>
                                    <span className="text-xs
                                    font-semibold uppercase
                                    tracking-wider
                                    text-gray-400">
                                        {address.postal_code}
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold text-gray-800 mb-1">
                                    {address.country}
                                </h2>

                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center text-gray-600">
                                        <MapPin size={16} className="mr-2 shrink-0"/>
                                        <p className="text-sm leading-relaxed">
                                            {address.street}
                                            {address.city && `, ${address.city}`}
                                            {address.province &&
                                                <span className="block italic text-gray-400">{address.province}</span>}
                                        </p>
                                    </div>
                                </div>

                                {/* Subtle decorative element */}
                                <div
                                    className="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full rounded-b-xl"/>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                        <div
                            className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Mail className="text-gray-400"/>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No addresses found</h3>
                        <p className="text-gray-500">This directory is currently empty.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddressesPage;