import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
export const LogoutButton = () => {
    const router = useRouter()
    const handleLogoutButton = async () => {
        try{
            const response = await fetch(process.env.NEXT_PUBLIC_LOGOUT_API!, {
                method: "DELETE",
                headers: {
                    'Content-Type' : 'application/json'
                },
            })

            const result = await response.json();
            console.debug(result);
            alert('Logout Successfull');
            
        }catch(e: unknown){
            if ( e instanceof Error) {
                throw new Error('failed to logout')
            }
        }
    }
  return (
    <Button variant="outline">Button</Button>
  )
}
