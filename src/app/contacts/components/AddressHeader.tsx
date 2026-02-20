"use client"
import {AddButton} from "@/app/contacts/components/AddButton";
import React from "react";
import {Address} from "@/app/types/interfaces";
import {AddModal} from "@/app/components/AddAddressModal";

interface AddressHeaderProps {
    address: Address[] | null;
    contactId : number;
}

export const AddressHeader = (
    {address , contactId}: AddressHeaderProps
) => {
    const [ isOpen , setIsOpen ] = React.useState(false);
    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }
    return (
        <>
            <header className="flex justify-between items-end border-b pb-6 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Addresses Directory
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Showing {address?.length || 0} registered locations
                    </p>
                </div>
                <div>
                    <AddButton onClick={handleOpen}/>
                </div>
            </header>

            {
                isOpen && (
                    <AddModal
                        isOpen={isOpen}
                        onClose={handleClose}
                        contactId={contactId}
                    />
                )
            }
        </>
    );
};
