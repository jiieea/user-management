"use client";

import { Address } from "@/app/types/interfaces";
import { Globe, MapPin } from "lucide-react";
import { EditButton } from "@/app/components/EditButton";

interface AddressCardProps {
    address: Address;
    onEdit: () => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
                                                            address,
                                                            onEdit,
                                                        }) => {
    return (
        <div className="group relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Globe size={20} />
                </div>

                <div className="flex flex-col items-end gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            {address.postal_code}
          </span>

                    <EditButton onClick={onEdit} />
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-1">
                {address.country}
            </h2>

            <div className="space-y-2 mt-4">
                <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2 shrink-0" />
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

            <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full rounded-b-xl" />
        </div>
    );
};
