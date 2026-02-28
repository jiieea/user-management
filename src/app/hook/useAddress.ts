"use client"

import {useRouter} from "next/navigation";
import {useState} from "react";
import {Address, AddressPayload} from "@/app/types/interfaces";
import Cookies from "js-cookie";
import {addAddressRequest, deleteAddressRequest} from "@/lib/data-api";
import {toast} from "sonner";

export const useAddress = () => {
    const router = useRouter();
    const [address, setAddress] = useState<Address | null>(null);
    const token = Cookies.get("token");

//     call add address
    const addAddressService = async (payload: AddressPayload, contactId: number) => {
        if (!token) {
            return;
        }
        return await addAddressRequest(payload, contactId, token);
    }


    const deleteAddressService = async (contactId: number , addressId : number) => {
        if(!token) {
            toast.error("Could not found session");
            return;
        }
        return await deleteAddressRequest(addressId, contactId , token);
    }
    return {
        addAddressService,
        deleteAddressService,
    }
}



