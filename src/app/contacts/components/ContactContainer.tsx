"use client"

import {ContactHeader} from "@/app/contacts/components/ContactHeader";
import SearchContact from "@/app/contacts/components/SearchContact";
import {ContactTable} from "@/app/contacts/components/ContactTable";
import {Contact} from "@/app/types/interfaces";
import {useContact} from "@/app/hook/useContact";
import {useAddress} from "@/app/hook/useAddress";

interface ContactContainerProps {
    contacts: Contact[];
}

export const ContactContainer = ({
                                     contacts,
                                 }: ContactContainerProps) => {
    const {addContactService, editContactService, isLoading, deleteContactService} = useContact();
    const {addAddressService} = useAddress()
    return (
        <>
            <ContactHeader handleAddContact={addContactService} isLoading={isLoading}/>
            <SearchContact/>
            <ContactTable
                handleAddAddress={ addAddressService }
                handleDeleteContact={deleteContactService}
                handleEditContact={editContactService}
                contacts={contacts!}/>
        </>
    );
};
