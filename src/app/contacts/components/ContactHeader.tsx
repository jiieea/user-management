import { AddContactDialog } from '@/app/components/AddContactDialog'
import React from 'react'
export const ContactHeader = () => {
  return (
    <div className="flex justify-between items-center">
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Contacts</h1>
      <p className="text-sm text-gray-500">Manage your list of connections</p>
    </div>
   <AddContactDialog />
  </div>
  )
}
