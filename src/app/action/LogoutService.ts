

export const logoutService = async (token : string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API}/current` , {
        method: 'DELETE',
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : token,
        },
    })

    if(!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err.errors.error ?? "Logout Failed")
    }
}