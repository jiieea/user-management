export type LoginPayload = {
    username: string,
    password: string,
}


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
        throw new Error(res.errors.error ?? "Login Failed");
    }

    return res.data;
}


export const getMeRequest = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_USER_API}/current`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const json = await res.json();
    if (!res.ok) {
        throw new Error('Unauthorized');
    }

    return json.data;

}


export const logoutRequest  = async (token : string) => {
     await fetch(`${process.env.NEXT_PUBLIC_USER_API}/current` , {
    method: "DELETE" ,
        headers: {
        "Content-Type": "application/json",
            "Authorization": token,
        },
    });
}