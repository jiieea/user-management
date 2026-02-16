import {ContactHeader} from "@/app/contacts/components/ContactHeader";
import {ContactTable} from "@/app/contacts/components/ContactTable";
import SearchContact from "@/app/contacts/components/SearchContact";
import searchContactsByName from "@/app/action/searchContactsByName";
interface PageProps {
   searchParams : Promise<{ query : string}>
}

export default async function ContactsPage({ searchParams }: PageProps) {
    const { query } = await searchParams;
    const contacts = await searchContactsByName(query);
    return (
        <div className="space-y-6">
            <ContactHeader />
            <SearchContact />
            <ContactTable contacts={contacts!} />
        </div>
    );
}
