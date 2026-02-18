"use client"

import {Address} from "@/app/types/interfaces"
import React, {useEffect, useState} from "react";
import EditAddressModal from "@/app/components/EditAddressModal";

interface ModalProviderProps {
    address: Address;
    contactId: number;
}

export const ModalProvider: React.FC<ModalProviderProps> = (
    {
        address,
        contactId,
    }
) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <EditAddressModal address={address} contactId={contactId}/>
        </>
    )
}