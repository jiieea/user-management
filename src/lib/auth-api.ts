import {LoginPayload, SignUpPayload} from "@/app/types/interfaces";

export const loginRequest = async (payload: LoginPayload) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const res = await response.json();
    if (!response.ok) {
        console.log(res.errors);
        throw new Error(res.errors)
    }
    return res;
}

export const signUpRequest = async (payLoad: SignUpPayload) => {
    const url = process.env.NEXT_PUBLIC_USER_API;

    if (!url) throw new Error("API URL is not defined.");

    const res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payLoad),
    });

    const data = await res.json();

    if (!res.ok) {
        let errorMessage = "An error occurred";

        if (Array.isArray(data.errors)) {
            errorMessage = data.errors[0]?.message || "Invalid input format";
        } else if (typeof data.errors === 'string') {
            errorMessage = data.errors;
        } else if (data.message) {
            errorMessage = data.message;
        }

        throw new Error(errorMessage);
    }

    return data;
}


export const getMeRequest = async (token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_USER_API}/current`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        }
    });
    const json = await res.json();
    if (!res.ok) {
        throw new Error('Unauthorized');
    }
    return json.data;
}


export const logoutRequest = async (token: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_USER_API}/current`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
    });
}

