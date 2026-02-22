"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, {useCallback} from 'react'
import Cookies from "js-cookie";
import {toast} from "sonner";



import {logoutService} from "@/app/action/LogoutService";
export const LogoutButton = () => {
    const router = useRouter();
    const handleLogout = useCallback(async () => {
        const token = Cookies.get('token');
        if(!token) {
            toast.error('Token Not Found');
            router.push('/login');
            return;
        }
        try {
            await logoutService(token);

            Cookies.remove('token');
            toast.success('Logout successfully');
            router.replace('/login');
        }catch (error : unknown) {
            if(error instanceof  Error) {
                toast.error(error.message);
            }
        }
    },[router]);
  return (
    <Button onClick={handleLogout} className="cursor-pointer hover:bg-secondary" variant="ghost">Logout</Button>
  )
}
