import {cookies} from "next/headers";
import {Contact} from "@/app/types/interfaces";

const searchContacts = async (query: string = ""): Promise<Contact[] | null> => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

    try {
        const url = new URL(process.env.NEXT_PUBLIC_SEARCH_CONTACT_API!);
        if(query) {
            url.searchParams.append('name', query);
            url.searchParams.append('email', query);
            url.searchParams.append('phone', query);
        }
        const response = await fetch( url.toString(), {
            method: 'GET',
            headers: {
                'Authorization': token!,
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
        })

        const result = await response.json();
        if (result.data.length < 0) {
            return null;
        }

        return result.data as Contact[];
    }catch (error) {
        console.error(error);
        return [];
    }
}

export default searchContacts;