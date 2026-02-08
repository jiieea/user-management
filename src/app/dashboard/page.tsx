import {Header} from "@/app/dashboard/components/Header";
import {cookies} from "next/headers";
import {toast} from "sonner"; // Correct way to get cookies on the server

const page = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // 2. Add a guard: If no token, handle it (redirect or show guest)
    if (!token) {
        return <div>Please log in.</div>;
    }

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_GET_USER_API!, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            cache: "no-store",
        });

        if (!response.ok) {
            toast.error("Failed to fetch user");
        }

        const result = await response.json();
        const user = result.data;

        return (
            <div className='flex flex-col items-center justify-center gap-x-5'>
                {user ? <Header user={user}/> : <div>User not found</div>}
                <div>
                    <h1>
                        This is main page
                    </h1>
                </div>
            </div>
        );
    } catch (error: unknown) {
        return <div>Error loading user data. ${ error.message }</div>;
    }
}

export default page;