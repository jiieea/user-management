"use client"
import React, {useEffect} from 'react';
import {AddressHeader} from "@/app/contacts/components/AddressHeader";
import AddressesClient from "@/app/components/AddressClient";
import {useAddress} from "@/app/hook/useAddress";


interface AddressContainerProps {
    contactId: number,
}
const AddressContainer = ( { contactId } : AddressContainerProps) =>  {
    const {getAddressService, address , addAddressService} = useAddress();
    return (
            <div>
                <div className="max-w-6xl mx-auto space-y-6">
                    <AddressHeader
                        handleAddAddress={ addAddressService }
                        contactId={Number(contactId)}
                    />
                    <AddressesClient
                        addresses={address!}
                        getAddress={ getAddressService }
                        contactId={Number(contactId)}
                    />
                </div>
            </div>
        );
}

export default AddressContainer;