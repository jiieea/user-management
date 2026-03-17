import { Contact, ContactPayload} from "@/app/types/interfaces";
import {requestHeaders , handleErrorException } from "@/lib/data-api";

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
