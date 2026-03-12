import React from "react";


export type LoginPayload = {
    username: string,
    password: string,
}

export type AddressPayload = {
    street?: string,
    city?: string,
    province?: string,
    country: string,
    postal_code: string,
}

export type ContactPayload = {
    first_name: string,
    last_name?: string,
    email?: string,
    phone: string
    id: string
}


export type SignUpPayload = {
    username: string,
    password: string,
    name: string,
}

export interface User {
    username?: string,
    password?: string,
    name?: string
}

export interface Contact {
    first_name: string,
    last_name?: string,
    email: string,
    phone: string
    id: string
}

export interface Address {
    id: number,
    street?: string,
    city?: string,
    province?: string,
    country: string,
    postal_code: string,
}


export interface DeleteContactProps {
    id: string,
    handleDeleteContact: (id: number) => Promise<void>,
}

export interface ContactModalForm {
    contact?: Contact,
    isEdit?: boolean,
}

export interface ModalContainerProps {
    children: React.ReactNode;
    title: string;
    isOpen: boolean;
    onChange: (open: boolean) => void;
}

export interface ModalProps {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}

export interface EditContactModalProps {
    contact: Contact
    isOpen: boolean,
    onClose: () => void;
    handleEditContact: (contact: ContactPayload, contactId: number) => Promise<void>;
}

export interface AddContactDialogProps {
    isOpen: boolean;
    onClose: () => void;
    handleAddContact: (contact: ContactPayload) => Promise<void>;
    isLoading: boolean;
}


export interface AddModalProps {
    isOpen: boolean;
    contactId: number;
    onClose: () => void;
    handleAddAddress: (address: AddressPayload, contactId: number) => Promise<void>;
}


export interface EditAddressModalProps {
    address: Address;
    contactId: number;
    isOpen: boolean;
    onClose: () => void;
}


export  interface AddressClientProps {
    contactId: number;
    addresses: Address[];
    getAddress: (contactId: number) => void;
}
