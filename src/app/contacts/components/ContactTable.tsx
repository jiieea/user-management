"use client"
import {EditContact} from "@/app/components/ContactForm";
import DeleteContactButton from "@/app/contacts/components/DeleteContactButton";
import {AddAddressModal} from "@/app/contacts/components/AddAddressModal";
import React from "react";
import {Contact} from "@/app/types/interfaces";
import {useRouter} from "next/navigation";

interface ContactTableProps {
    contacts: Contact[];
}

export const ContactTable: React.FC<ContactTableProps> = (
    {
        contacts,
    }
) => {
    const router = useRouter();

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Phone</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                    {contacts!.length > 0 ? (
                        contacts!.map((contact) => (
                            <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900" onClick={() =>router.push(`/address/${contact.id}`)}>
                                        {contact.first_name} {contact.last_name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{contact.email}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{contact.phone}</td>
                                <td className="px-6 py-4 text-right">
                                    <EditContact contact={contact} />
                                    <DeleteContactButton id={contact.id} />
                                </td>
                                <td>
                                    <AddAddressModal contact={contact} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                                No contacts found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
};
