import { getContact } from "../action/getContact";
import { ContactHeader } from "./components/ContactHeader";
import SearchContact from "./components/SearchContact";
import React from "react";
import {ContactTable} from "@/app/contacts/components/ContactTable";
export default async function ContactsPage() {
  const contacts =  await getContact();
  return (
    <div className="space-y-6">
      <ContactHeader />
    <SearchContact />
      {/* Contacts Table */}
     <ContactTable contacts={contacts!}/>
    </div>
  );
}