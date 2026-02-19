"use client";

import {Address} from "@/app/types/interfaces";
import {Globe, MapPin, Trash2} from "lucide-react";
import {EditButton} from "@/app/components/EditButton";
import React from "react";
import {toast} from "sonner";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

interface AddressCardProps {
    address: Address;
    onEdit: () => void;
    contactId: number;
    onDelete: () => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
                                                            address,
                                                            onDelete,
                                                            onEdit,
                                                        }) => {

    return (
        <div
            className="group relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Globe size={20}/>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {address.postal_code}
                    </span>

                    {/* Action Container */}
                    <div className="flex items-center gap-2">
                        <EditButton onClick={onEdit}/>

                        <button
                            onClick={onDelete}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            aria-label="Delete address"
                        >
                            <Trash2 size={18}/>
                        </button>
                    </div>
                </div>
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
                        {address.province && (
                            <span className="block italic text-gray-400">
                                {address.province}
                            </span>
                        )}
                    </p>
                </div>
            </div>

            <div
                className="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full rounded-b-xl"/>
        </div>
    );
};