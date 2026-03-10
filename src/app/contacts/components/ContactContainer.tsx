"use client"

import {ContactHeader} from "@/app/contacts/components/ContactHeader";
import SearchContact from "@/app/contacts/components/SearchContact";
import {ContactTable} from "@/app/contacts/components/ContactTable";
import {Contact} from "@/app/types/interfaces";
import {useContact} from "@/app/hook/useContact";

interface ContactContainerProps {
    contacts: Contact[];
}

export const ContactContainer = ({
                                     contacts,
                                 }: ContactContainerProps) => {
    const {addContactService, editContactService, isLoading} = useContact();
    return (
        <>
            <ContactHeader handleAddContact={addContactService} isLoading={isLoading}/>
            <SearchContact/>
            <ContactTable
                handleEditContact={ editContactService }
                contacts={contacts!}/>
        </>
    );
};
