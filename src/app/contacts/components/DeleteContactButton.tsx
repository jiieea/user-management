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
import Cookies from "js-cookie";
import {toast} from "sonner";
import {Spinner} from "@/components/ui/spinner";
import {useRouter} from "next/navigation";

const DeleteContactButton: React.FC<DeleteContactProps> = ({id}) => {
    const token = Cookies.get('token');
    const router = useRouter();
    const [ isLoading, setIsLoading ] = React.useState(false);
    const handleDeleteContact = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DELETE_CONTACT_API}/${id}` ,{
                method: 'DELETE',
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization': token!
                }
            })
            const result = await response.json();
            console.debug(JSON.stringify(result));
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to delete');
            }

            toast.success('Contact deleted successfully.');
            router.refresh();
            return { data: true };
        }catch (error : unknown) {
            return {
                data: false,
                message: error instanceof Error ? error.message : "Unknown error"
            };
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
                    <AlertDialogAction onClick={() => handleDeleteContact()}>{
                        isLoading ? <Spinner/> : "Delete"
                    }</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteContactButton
