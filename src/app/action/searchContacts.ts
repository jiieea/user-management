import {cookies} from "next/headers";
import {Contact} from "@/app/types/interfaces";
import {getContactRequest} from "@/services/contact.service";
import {requestHeaders} from "@/lib/data-api";

const searchContacts = async (query: string): Promise<Contact[] | null> => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

    try {
        const url = new URL(process.env.NEXT_PUBLIC_CONTACT_API!);
        if (!query) {
            return await getContactRequest(token!);
        }
        if (!token) {
            return [];
        }
        url.searchParams.set('search', query);
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: requestHeaders(token),
            cache: 'no-cache',
        })

        const result = await response.json();
        if (!result.data || result.data.length === 0) {
            return [];
        }

        return result.data as Contact[];
    } catch {
        return [];
    }
}

export default searchContacts;