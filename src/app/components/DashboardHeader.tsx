"use client"
import {Header} from "@/app/components/Header";

import {AddContactDialog} from '@/app/components/AddContactDialog'
import React from 'react'
import {Button} from "@/components/ui/button";

export const DashBoardHeader = () => {
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
                    isOpen={isOpen}
                    onClose={handleClose}
                />
            )}
        </>
    )
}

