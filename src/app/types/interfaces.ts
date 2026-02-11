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


export interface DeleteContactProps {
    id : string,
}

export interface ContactModalForm {
    contact?: Contact,
    isEdit?: boolean,
}