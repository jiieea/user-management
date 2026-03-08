import {AddressPayload, Contact, ContactPayload} from "@/app/types/interfaces";
import {Address} from "@/app/types/interfaces";
import Cookies from "js-cookie";

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
            },
            body: JSON.stringify(payload),
        });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.errors[0].message);
    }
    return result.data;
}


export const getAddressRequest = async (contactId: number): Promise<Address[] | null> => {
    const token = Cookies.get('token')

    // Handle missing token gracefully
    if (!token) {
        console.error("No auth token found");
        return null;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADDRESS_API}/${contactId}/addresses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });


        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.errors.error);
        }
        if (!result.data || result.data.length === 0) {
            return []; // Returning an empty array is usually safer than null for lists
        }

        return result.data as Address[] | null;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        return null;
    }
};


export const addContactRequest = async (payload: ContactPayload, token: string) => {
    if (!token) {
        throw new Error(`No auth token found`);
    }
    const response = await fetch(process.env.NEXT_PUBLIC_CONTACT_API!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) {
        let errorMessage = "An error occurred";

        if (Array.isArray(result.errors)) {
            errorMessage = result.errors[0]?.message || "Invalid input format";
        } else if (typeof result.errors === 'string') {
            errorMessage = result.errors;
        } else if (result.message) {
            errorMessage = result.message;
        }

        throw new Error(errorMessage);
    }

    return result.data;
}

export  const getContactRequest = async (token : string) => {
    if (!token) {
        throw new Error("Cookie not found");
    }
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_CONTACT_API!, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const result = await response.json();
        return result.data as Contact[] | null;
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw e;
        }
        return null;
    }
}