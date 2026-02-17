import {cookies} from "next/headers";
import {Contact} from "@/app/types/interfaces";
import {getContact} from "@/app/action/getContact";

const searchContacts = async (query: string): Promise<Contact[] | null> => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

    try {
        const url = new URL(process.env.NEXT_PUBLIC_CONTACT_API!);
        if (!query) {
            return await getContact();
        }

        url.searchParams.set('search', query);
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Authorization': token!,
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
        })

        const result = await response.json();
        if (!result.data || result.data.length === 0) {
            return [];
        }

        return result.data as Contact[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default searchContacts;