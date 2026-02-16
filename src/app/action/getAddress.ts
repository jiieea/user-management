import { cookies } from "next/headers";
import { Address } from "@/app/types/interfaces";

export const getAddressById = async (contactId: string): Promise<Address[] | null> => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

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
                'Authorization': token!,
            },
            cache: 'no-cache',
        });

        if (!response.ok) {
            return null;
        }

        const result = await response.json();

        if (!result.data || result.data.length === 0) {
            return []; // Returning an empty array is usually safer than null for lists
        }

        return result.data as Address[];
    } catch (err) {
        console.error("Fetch error:", err);
        return null;
    }
};