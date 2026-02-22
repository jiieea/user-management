"use client"
import {AddButton} from "@/app/contacts/components/AddButton";
import React from "react";
import {Address} from "@/app/types/interfaces";
import {AddModal} from "@/app/components/AddAddressModal";
import {Header} from "@/app/components/Header";


interface AddressHeaderProps {
    address: Address[] | null;
    contactId: number;
}

export const AddressHeader = (
    {address, contactId}: AddressHeaderProps
) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }
    return (
        <>
            <Header title=" Addresses Directory" desc="Showing Registered Addresses">
                <div>
                    <AddButton onClick={handleOpen}/>
                </div>
            </Header>

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

