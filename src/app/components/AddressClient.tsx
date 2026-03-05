"use client";

import {Address} from "@/app/types/interfaces";
import {AddressCard} from "@/app/components/AddressTable";
import EditAddressModal from "@/app/components/EditAddressModal";
import React, {useEffect, useState} from "react";
import {DeleteAddressModal} from "@/app/components/DeleteAddressModal";
import {Mail} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton"
import {Card, CardHeader, CardContent} from "@/components/ui/card";

interface Props {
    contactId: number;
    addresses: Address[];
    getAddress: (contactId: number) => void;
}

const AddressesClient: React.FC<Props> = ({
                                              contactId,
                                              addresses,
                                              getAddress,
                                          }) => {
    const [selectedAddress, setSelectedAddress] =
        useState<Address | null>(null);
    const [deleteAddress, setDeleteAddress] = useState<Address | null>(null);

    useEffect(() => {
        getAddress(contactId)
    }, [getAddress, contactId])

    if (!addresses) {
        return <div>
            <Card className="w-full max-w-xs">
                <CardHeader>
                    <Skeleton className="h-4 w-2/3"/>
                    <Skeleton className="h-4 w-1/2"/>
                </CardHeader>
                <CardContent>
                    <Skeleton className="aspect-video w-full"/>
                </CardContent>
            </Card>
        </div>;
    }
    return (
        <>
            {
                addresses.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                        <div
                            className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Mail className="text-gray-400"/>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                            No addresseses found
                        </h3>
                        <p className="text-gray-500">
                            This directory is currently empty.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {addresses!.map((address) => (
                            <AddressCard
                                key={address.id}
                                address={address}
                                contactId={contactId}
                                onDelete={() => setDeleteAddress(address)}
                                onEdit={() => setSelectedAddress(address)}
                            />
                        ))}
                    </div>
                )
            }

            {deleteAddress && (
                <DeleteAddressModal
                    address={deleteAddress}
                    contactId={contactId}
                    isOpen={!!deleteAddress}
                    onClose={() => setDeleteAddress(null)}
                />
            )}
            {selectedAddress && (
                <EditAddressModal
                    address={selectedAddress}
                    contactId={contactId}
                    isOpen={!!selectedAddress}
                    onClose={() => setSelectedAddress(null)}
                />
            )}


        </>
    );
};

export default AddressesClient;
