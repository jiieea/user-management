"use client"

import DeleteContactButton from "@/app/contacts/components/DeleteContactButton";
import React from "react";
import {AddressPayload, Contact, ContactPayload} from "@/app/types/interfaces";
import {useRouter} from "next/navigation";
import {CiCirclePlus} from "react-icons/ci";
import {AddModal} from "@/app/components/AddAddressModal";
import {EditContactModal} from "@/app/components/EditContactModal";

interface ContactTableProps {
    contacts: Contact[];
    handleEditContact: (contact: ContactPayload, contactId: number) => void;
    handleDeleteContact: (id: number) => void;
    handleAddAddress: (payload: AddressPayload, contactId: number) => void;
}

export const ContactTable: React.FC<ContactTableProps> = ({
                                                              contacts,
                                                              handleEditContact,
                                                              handleDeleteContact,
                                                              handleAddAddress
                                                          }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedContactId, setSelectedContactId] = React.useState<number | null>(null);
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null);
    const openModal = (contactId: number) => {
        setSelectedContactId(contactId);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedContactId(null);
    };

    const openEditModal = (contact: Contact) => {
        setSelectedContact(contact);
        setIsEditOpen(true);
    };

    const closeEditModal = () => {
        setIsEditOpen(false);
        setSelectedContact(null);
    };

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
                        <th/>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-50">
                    {contacts.length > 0 ? (
                        contacts.map((contact) => (
                            <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div
                                        className="font-medium text-gray-900 cursor-pointer"
                                        onClick={() => router.push(`/address/${contact.id}`)}
                                    >
                                        {contact.first_name} {contact.last_name}
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-gray-600 text-sm">{contact.email}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{contact.phone}</td>

                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => openEditModal(contact)}
                                        className="text-primary hover:underline text-sm font-medium mr-4"
                                    >Edit
                                    </button>
                                    <DeleteContactButton handleDeleteContact={handleDeleteContact} id={contact.id}/>
                                </td>

                                <td className="px-4">
                                    <CiCirclePlus
                                        className="text-xl cursor-pointer"
                                        onClick={() => openModal(Number(contact.id))}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                                No contacts found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            {isOpen && selectedContactId && (
                <AddModal
                    handleAddAddress={handleAddAddress}
                    contactId={selectedContactId}
                    isOpen={isOpen}
                    onClose={closeModal}
                />
            )}

            {
                isEditOpen && selectedContact && (
                    <EditContactModal
                        handleEditContact={handleEditContact}
                        isOpen={isEditOpen}
                        contact={selectedContact}
                        onClose={closeEditModal}
                    />
                )
            }
        </>
    );
};