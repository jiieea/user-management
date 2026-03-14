import {AddressPayload, Contact, ContactPayload} from "@/app/types/interfaces";
import {Address} from "@/app/types/interfaces";

export const addAddressRequest = async (
    payload: AddressPayload, contactId: number,
    token: string
) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ADDRESS_API}/${contactId}/addresses`, {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_ADDRESS_API!}/${contactId}/addresses/${addressId}`, {
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
        `${process.env.NEXT_PUBLIC_ADDRESS_API}/${contactId}/addresses/${addressId}`, {
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADDRESS_API}/${contactId}/addresses`, {
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


export const addContactRequest = async (payload: ContactPayload, token: string) => {
    if (!token) {
        throw new Error(`No auth token found`);
    }
    const response = await fetch(process.env.NEXT_PUBLIC_CONTACT_API!, {
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


export const editContactRequest = async (payload: ContactPayload, contactId: number, token: string) => {
    if (!token) {
        return;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONTACT_API}/${contactId}`, {
            method: 'PUT',
            headers: requestHeaders(token),
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (!response.ok) {
            handleErrorException(data);
        }

        return data.data;

    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}

export const getContactRequest = async (token: string) => {
    if (!token) {
        throw new Error("Cookie not found");
    }
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_CONTACT_API!, {
            method: 'GET',
            headers: requestHeaders(token),
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


export const deleteContactRequest = async (token: string, contactId: number) => {
    if (!token) {
        throw new Error("Cookie not found");
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONTACT_API!}/${contactId}`, {
            method: 'DELETE',
            headers: requestHeaders(token),
        });

        const result = await response.json();
        if (!response.ok) {
            handleErrorException(result);
        }
        return result.data;
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw new Error(e.message);
        }
    }
}


export const handleErrorException = (result: any) => {
    let errMsg = "An error occurred";

    if (Array.isArray(result.errors)) {
        errMsg = result.errors[0]?.message || "Invalid input format";
    } else if (typeof result.errors === 'string') {
        errMsg = result.errors;
    } else if (result.message) {
        errMsg = result.message;
    }
    throw new Error(errMsg);
}

const requestHeaders = (token: string) => ({
    'Content-Type': 'application/json',
    Authorization: token,
})