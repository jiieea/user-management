import { cookies } from "next/headers";
import { User } from "../types/interfaces";

// We update the return type to include 'null' explicitly
export const getUser = async (): Promise<User | null> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return null;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API!}/current`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token!
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            return null;
        }

        const result = await response.json();

        return result.data as User; 

    } catch (e: unknown) {
        console.error("Fetch error:", e);
        return null;
    }
}