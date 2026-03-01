import {AddressPayload} from "@/app/types/interfaces";

export const addAddressRequest = async (
    payload: AddressPayload, contactId: number,
    token: string
) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ADDRESS_API}/${contactId}/addresses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) {
        let errorMessage = "Address already exists";
        if (Array.isArray(result.errors)) {
            errorMessage = result.errors[0]?.message || "Invalid input format";
        }
        throw new Error(errorMessage);
    }

    return result.data;
}


export const deleteAddressRequest = async (addressId: number, contactId: number, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ADDRESS_API!}/${contactId}/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": token
        }
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.errors);
    }

    return result.data;
}

export const editAddressRequest = async (
    payload: AddressPayload,
    addressId: number, contactId: number,
    token: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADDRESS_API}/${contactId}/addresses/${addressId}
        `, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.errors[0].message);
    }

    return result.data;
}


const getAddressRequest = async (addressId: string) => {
//     ....
}