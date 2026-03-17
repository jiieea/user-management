import {LoginPayload, SignUpPayload} from "@/app/types/interfaces";
import {handleErrorException , requestHeaders} from "@/lib/data-api";


export const apiUrl = process.env.NEXT_PUBLIC_USER_API;
export const loginRequest = async (payload: LoginPayload) => {
    const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const res = await response.json();
    if (!response.ok) {
        handleErrorException(res);
    }
    return res;
}

export const signUpRequest = async (payLoad: SignUpPayload) => {

    const res = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payLoad),
    });

    const data = await res.json();

    if (!res.ok) {
        handleErrorException(data)
    }

    return data;
}


export const getMeRequest = async (token: string) => {
    const res = await fetch(`${apiUrl}/current`, {
        method: "GET",
        headers: requestHeaders(token)
    });
    const json = await res.json();
    if (!res.ok) {
        throw new Error('Unauthorized');
    }
    return json.data;
}


export const logoutRequest = async (token: string) => {
    await fetch(`${apiUrl}/current`, {
        method: "DELETE",
        headers: requestHeaders(token)
    });
}

