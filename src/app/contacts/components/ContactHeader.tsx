"use client"

import {AddContactDialog} from '@/app/components/AddContactDialog'
import React from 'react'
import {Button} from "@/components/ui/button";

export const ContactHeader = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Contacts</h1>
                        <p className="text-sm text-gray-500">Manage your list of connections</p>
                    </div>
                </div>
                <Button onClick={handleOpen}>
                    Add New Contact
                </Button>
            </div>
            {isOpen && (
                <AddContactDialog
                    isOpen={isOpen}
                    onClose={handleClose}
                />
            )}
        </>
    )
}
