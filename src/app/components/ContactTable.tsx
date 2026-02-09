import React from 'react'
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import { Contact } from '../types/interfaces';

interface ContactTableProps {
    contacts: Contact[]
}
export const ContactTable: React.FC<ContactTableProps> = (
    {
        contacts
    }
) => {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <h2 className="font-bold text-gray-800 text-lg">Recently Added Contacts</h2>
                <button className="text-primary text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-gray-400 text-sm uppercase tracking-wider">
                            <th className="px-6 py-4 font-medium">Name</th>
                            <th className="px-6 py-4 font-medium">Phone</th>
                            <th className="px-6 py-4 font-medium">Email</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {
                            contacts?.length === 0 ? (
                                <div>
                                    No Contact added
                                </div>
                            ) : (
                                <>
                                    {contacts!.map((contact) => (
                                        <tr key={contact.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                        {
                                                            contact.first_name.split(' ').map(first => first[0])
                                                        }
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{contact.first_name}</p>
                                                        <p className="text-xs text-gray-500">Software Engineer</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 text-sm">+1 {contact.phone}</td>
                                            <td className="px-6 py-4 text-gray-600 text-sm">{contact.email}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button className="p-2 hover:bg-white rounded-full border border-transparent bg-neutral-200 hover:border-gray-200 text-gray-400 hover:text-primary transition-all">
                                                        <Phone size={16} />
                                                    </Button>
                                                    <button className="p-2 hover:bg-white rounded-full border border-transparent hover:border-gray-200 text-gray-400 hover:text-primary transition-all">
                                                        <Mail size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
