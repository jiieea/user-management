import {AddressPayload} from "@/app/types/interfaces";
import {handleErrorException, requestHeaders} from "@/lib/data-api";
import {Address} from "@/app/types/interfaces"


export const apiUrl = process.env.NEXT_PUBLIC_ADDRESS_API;

export const addAddressRequest = async (
    payload: AddressPayload, contactId: number,
    token: string
) => {
    const response = await fetch(`${apiUrl}/${contactId}/addresses`, {
        method: 'POST',
        headers: requestHeaders(token),
        body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) {
        handleErrorException(result);
    }

    return result.data;
}


export const deleteAddressRequest = async (addressId: number, contactId: number, token: string) => {
    const response = await fetch(`${apiUrl}/${contactId}/addresses/${addressId}`, {
        method: 'DELETE',
        headers: requestHeaders(token),
    });
    const result = await response.json();
    if (!response.ok) {
        handleErrorException(result);
    }

    return result.data;
}

export const editAddressRequest = async (
    payload: AddressPayload,
    addressId: number, contactId: number,
    token: string) => {
    const response = await fetch(
        `${apiUrl}/${contactId}/addresses/${addressId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(payload),
        });

    const result = await response.json();
    if (!response.ok) {
        handleErrorException(result);
    }
    return result.data;
}


export const getAddressRequest = async (contactId: number, token: string): Promise<Address[] | null> => {

    // Handle missing token gracefully
    if (!token) {
        console.error("No auth token found");
        return null;
    }

    try {
        const response = await fetch(`${apiUrl}/${contactId}/addresses`, {
            method: 'GET',
            headers: requestHeaders(token),
        });
        const result = await response.json();
        if (!response.ok) {
            handleErrorException(result);
        }
        if (!result.data || result.data.length === 0) {
            return []; // Returning an empty array is usually safer than null for lists
        }

        return result.data as Address[] | null;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        return [];
    }
};
