"use client"
import {Header} from "@/app/components/Header";

import {AddContactDialog} from '@/app/components/AddContactDialog'
import React from 'react'
import {Button} from "@/components/ui/button";
import { ContactPayload} from "@/app/types/interfaces";


interface DashboardHeaderProps {
    handleAddContact: (payload: ContactPayload) => Promise<void>,
    isLoading :boolean,
}
export const DashBoardHeader: React.FC<DashboardHeaderProps> = (
    {
        handleAddContact,
        isLoading,
    }
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
            <Header title="Contacts" desc="Welcome back!
        Here’s what’s happening with your network.">
                <Button onClick={handleOpen}>
                    Add New Contact
                </Button>
            </Header>
            {isOpen && (
                <AddContactDialog
                    handleAddContact={handleAddContact}
                    isLoading={isLoading}
                    isOpen={isOpen}
                    onClose={handleClose}
                />
            )}
        </>
    )
}

