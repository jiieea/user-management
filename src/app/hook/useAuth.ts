"use client"
import Cookies from "js-cookie";
import {useCallback, useEffect, useState} from "react";
import {LoginPayload, SignUpPayload, User} from "@/app/types/interfaces";
import {useRouter} from "next/navigation";
import {getMeRequest, loginRequest, logoutRequest, signUpRequest} from "@/lib/auth.service";
import {toast} from "sonner";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const token = Cookies.get("token");
    const loginService = async (payload: LoginPayload) => {
        const response = await loginRequest(payload);

        Cookies.set('token', response.data.token, {expires: 7});
        setUser(response.data);
    }

    const signupService = async (payload: SignUpPayload) => {
        return await signUpRequest(payload);
        }

    const fetchMe = useCallback(async () => {
        {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const data = await getMeRequest(token);
                setUser(data);
            } catch {
                Cookies.remove('token');
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }
    }, [token]);

    useEffect(() => {
        fetchMe()
    }, [fetchMe])

    const logout = async () => {
        if (!token) {
            toast.error("Session Not Found");
            return;
        }
        await logoutRequest(token);
        Cookies.remove('token');
        setUser(null);

        toast.success("Logged out");
        router.push('/login');
        router.refresh();
    }

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        loginService,
        logout,
        signupService,
        refetchUser: fetchMe,
    };
}