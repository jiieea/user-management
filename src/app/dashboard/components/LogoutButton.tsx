"use client"
import { Button } from '@/components/ui/button'
import React from 'react'



import {useAuth} from "@/app/hook/useAuth";
export const LogoutButton = () => {
    const { logout } = useAuth();

  return (
    <Button onClick={() => logout()} className="cursor-pointer hover:bg-secondary" variant="ghost">Logout</Button>
  )
}
