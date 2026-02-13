export interface User {
    username?: string,
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
    street?: string,
    city?: string,
    province?: string,
    country: string,
    postal_code: string,
}


export interface DeleteContactProps {
    id : string,
}

export interface ContactModalForm {
    contact?: Contact,
    isEdit?: boolean,
}

