"use client"
import {Header} from "@/app/components/Header";

import {AddContactDialog} from '@/app/components/AddContactDialog'
import React from 'react'
import {Button} from "@/components/ui/button";
import {useContact} from "@/app/hook/useContact";

export const ContactHeader = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { isLoading , addContactService } = useContact();
    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }
    return (
        <>
            <Header title="Contacts" desc="Manage Your Relations">
                <Button onClick={handleOpen}>
                    Add New Contact
                </Button>
            </Header>
            {isOpen && (
                <AddContactDialog
                    handleAddContact={ addContactService }
                    isLoading={ isLoading}
                    isOpen={isOpen}
                    onClose={handleClose}
                />
            )}
        </>
    )
}

