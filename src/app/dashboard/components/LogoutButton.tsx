"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import Cookies from "js-cookie";
import {toast} from "sonner";
export const LogoutButton = () => {
    const router = useRouter();
    const token = Cookies.get('token')
    const handleLogoutButton = async () => {
        try{
            const response = await fetch(process.env.NEXT_PUBLIC_LOGOUT_USER_API!, {
                method: "DELETE",
                headers: {
                    'Content-Type' : 'application/json',
                    "Authorization": token!,
                },
            })
            Cookies.remove('token');
            const result = await response.json();
            console.debug(result);
            toast.success('Logout Successfull');
            router.push('/login');
            router.refresh()
        }catch(e: unknown){
            if ( e instanceof Error) {
                toast.error('failed to logout')
            }
        }
    }
  return (
    <Button onClick={handleLogoutButton} className="cursor-pointer" variant="outline">Logout</Button>
  )
}
