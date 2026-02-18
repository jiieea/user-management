"use client";

import {Address} from "@/app/types/interfaces";
import {AddressCard} from "@/app/components/AddressTable";
import EditAddressModal from "@/app/components/EditAddressModal";
import {useState} from "react";

interface Props {
    addresses: Address[];
    contactId: number;
}

const AddressesClient: React.FC<Props> = ({
                                              addresses,
                                              contactId,
                                          }) => {
    const [selectedAddress, setSelectedAddress] =
        useState<Address | null>(null);

    return (
        <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {addresses.map((address) => (
                    <AddressCard
                        key={address.id}
                        address={address}
                        onEdit={() => setSelectedAddress(address)}
                    />
                ))}
            </div>

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
