"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import Cookies from "js-cookie";
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

            const result = await response.json();
            console.debug(result);
            alert('Logout Successfull');
            router.push('/login');
        }catch(e: unknown){
            if ( e instanceof Error) {
                alert('failed to logout')
            }
        }
    }
  return (
    <Button onClick={handleLogoutButton} variant="outline">Button</Button>
  )
}
