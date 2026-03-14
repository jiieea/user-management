
import searchContacts from "@/app/action/searchContacts";
import {ContactContainer} from "@/app/contacts/components/ContactContainer";

interface PageProps {
   searchParams : Promise<{ query : string}>
}

export default async function ContactsPage({ searchParams }: PageProps) {
    const { query } = await searchParams;
    const contacts = await searchContacts(query);
    if(!contacts) {
        return null;
    }
    return (
        <div className="space-y-6">
           <ContactContainer query={ query } contacts={contacts}/>
        </div>
    );
}
