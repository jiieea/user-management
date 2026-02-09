import { cookies } from "next/headers";
import { Contact } from "../types/interfaces";


export const getContact = async() : Promise<Contact[] | null> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_GET_CONTACT_API!, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : token!
            }
        })

        const result =  await response.json();
        return result.data as Contact[]
    }catch (e: unknown) {
        return null;
    }
}