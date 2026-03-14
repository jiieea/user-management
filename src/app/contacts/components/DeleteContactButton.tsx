"use client"
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {DeleteContactProps} from "@/app/types/interfaces";
import {Spinner} from "@/components/ui/spinner";
import {toast} from "sonner";

const DeleteContactButton: React.FC<DeleteContactProps> = ({id , handleDeleteContact }) => {
    const [ isLoading, setIsLoading ] = React.useState(false);
    const handleDelete = async () => {
        setIsLoading(true);
        try {
           await handleDeleteContact(Number(id));
        }catch (error : unknown) {
           if(error instanceof Error) {
               toast.error(error.message);
           }
        }finally {
            setIsLoading(false);
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="text-red-500 hover:underline text-sm font-medium">Delete</button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure wanna delete this contact?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the
                        contact.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete()}>{
                        isLoading ? <Spinner/> : "Delete"
                    }</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteContactButton
