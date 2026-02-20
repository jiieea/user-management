import {getAddressByContactId} from "@/app/action/getAddress";
import {Mail} from "lucide-react";
import AddressesClient from "@/app/components/AddressClient";
import React from "react";
import {AddressHeader} from "@/app/contacts/components/AddressHeader";

interface PageProps {
    params: Promise<{ id: string }>;
}
const AddressesPage: React.FC<PageProps> = async ({params}) => {
    const {id} = await params;
    const addresses  = await getAddressByContactId(id);
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                    <AddressHeader
                    address={addresses}
                    contactId={Number(id)}
                    />

                {addresses && addresses.length > 0 ? (
                    <AddressesClient
                        addresses={addresses}
                        contactId={Number(id)}
                    />
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                        <div
                            className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Mail className="text-gray-400"/>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                            No addresses found
                        </h3>
                        <p className="text-gray-500">
                            This directory is currently empty.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddressesPage;
