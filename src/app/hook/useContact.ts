"use client"


import {useRouter} from "next/navigation";
import {useState} from "react";
import Cookies from "js-cookie";
import {addContactRequest, getContactRequest} from "@/lib/data-api";
import {Contact, ContactPayload} from "@/app/types/interfaces";
import {toast} from "sonner";

export const useContact = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [contacts, setContacts] = useState<Contact[]>([]);



    const addContactService = async (payload: ContactPayload) => {
        const token = Cookies.get('token');
        if (!token) {
            return;
        }

        setIsLoading(true);
        try {
            const newContact = await addContactRequest(payload, token);
            setContacts(prevState => prevState ? [...prevState, newContact] : [newContact]);
            toast.success("Add New Contact");
            router.refresh();
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw e;
            }
        } finally {
            setIsLoading(false);
        }
    }


    const getContacts = async () => {
        const token = Cookies.get('token');
        if (!token) {
            return;
        }
        const contacts = await getContactRequest(token);
        if (!contacts) {
            return [];
        }
        setContacts(contacts);
    }

    return {
        isLoading,
        addContactService,
        contacts,
        getContacts,
    }
}