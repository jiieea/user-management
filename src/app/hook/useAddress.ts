"use client"

import {useRouter} from "next/navigation";
import {useState} from "react";
import {Address, AddressPayload} from "@/app/types/interfaces";
import Cookies from "js-cookie";
import {addAddressRequest, deleteAddressRequest, editAddressRequest} from "@/lib/data-api";

export const useAddress = () => {
    const router = useRouter();
    const [address, setAddress] = useState<Address | null>(null);

//     call add address
    const addAddressService = async (payload: AddressPayload, contactId: number) => {
        const token = Cookies.get("token");

        if (!token) {
            throw new Error('Session Missing')
        }
        return await addAddressRequest(payload, contactId, token);
    }


    const deleteAddressService = async (contactId: number, addressId: number) => {
        const token = Cookies.get("token");

        if (!token) {
            throw new Error('Session Missing')
        }
        return await deleteAddressRequest(addressId, contactId, token);
    }


    const editAddressService = async (payload: AddressPayload, contactId: number , addressId: number) => {
        const token = Cookies.get("token");
        if (!token) {
            throw new Error('Session Missing')
        }

        return await editAddressRequest(payload, addressId, contactId, token);
    }
    return {
        addAddressService,
        editAddressService,
        deleteAddressService,
    }
}



