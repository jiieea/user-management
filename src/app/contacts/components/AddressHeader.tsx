"use client"
import {AddButton} from "@/app/contacts/components/AddButton";
import React from "react";
import {AddModal} from "@/app/components/AddAddressModal";
import {Header} from "@/app/components/Header";
import {AddressPayload} from "@/app/types/interfaces";


interface AddressHeaderProps {
    contactId: number;
    handleAddAddress: ( payload: AddressPayload , contactId: number ) => void;
}

export const AddressHeader = (
    { contactId , handleAddAddress}: AddressHeaderProps
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
                        handleAddAddress={ handleAddAddress }
                        isOpen={isOpen}
                        onClose={handleClose}
                        contactId={contactId}
                    />
                )
            }
        </>
    );
};

