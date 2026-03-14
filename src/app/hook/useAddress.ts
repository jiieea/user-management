"use client"

import {useState} from "react";
import {Address, AddressPayload} from "@/app/types/interfaces";
import Cookies from "js-cookie";
import {addAddressRequest, deleteAddressRequest, editAddressRequest, getAddressRequest} from "@/lib/data-api";

export const useAddress = () => {
    const [address, setAddress] = useState<Address[] | null>(null);

//     call add address
    const addAddressService = async (payload: AddressPayload, contactId: number) => {
        const token = Cookies.get("token");

        if (!token) {
            throw new Error('Session Missing')
        }
        const newAddress = await addAddressRequest(payload, contactId, token);
        setAddress(prevState => prevState ? [...prevState, newAddress] : [newAddress]);

        return newAddress;
    }


    const deleteAddressService = async (contactId: number, addressId: number) => {
        const token = Cookies.get("token");

        if (!token) {
            throw new Error('Session Missing')
        }
        return await deleteAddressRequest(addressId, contactId, token);
    }


    const editAddressService = async (payload: AddressPayload, contactId: number, addressId: number) => {
        const token = Cookies.get("token");
        if (!token) {
            throw new Error('Session Missing')
        }

        return await editAddressRequest(payload, addressId, contactId, token);
    }


    const getAddressService = async (contactId: number) => {
        const token = Cookies.get("token");

        if (!token) {
            throw new Error('Session Missing');
        }
        if (!contactId) {
            return;
        }
        try {
            const address = await getAddressRequest(contactId, token);
            setAddress(address ?? []);
        } catch {
            setAddress([]);
        }
    }

    return {
        addAddressService,
        address,
        getAddressService,
        editAddressService,
        deleteAddressService,
    }
}



