"use client"
import React, {useEffect, useState} from 'react'
import {
    DialogTrigger, Dialog
    , DialogContent, DialogHeader,
    DialogTitle,
    DialogClose, DialogFooter
} from '@/components/ui/dialog';
import {Field, FieldGroup} from "@/components/ui/field"
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Plus} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import Cookies from "js-cookie";
import {FieldValues, useForm, SubmitHandler} from 'react-hook-form';
import {toast} from 'sonner';
import {Spinner} from '@/components/ui/spinner';

export const AddContactDialog = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const token = Cookies.get('token');
    const {
        reset,
        handleSubmit,
        register
    } = useForm<FieldValues>({
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: ""
        }
    })

    const handleAddContact: SubmitHandler<FieldValues> = async (values) => {
        setIsLoading(true);
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_UPLOAD_CONTACT_API!, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token!
                },
                body: JSON.stringify(values)
            })
            const result = await response.json();
            if (!response.ok) {
                const message = response.status === 404 ? result.errors
                    : result.message || "Uploading Failed";
                toast.error(message);
                return;
            }
            toast.success('Add new contacts');
            reset();
            router.refresh();
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message)
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-all">
                    <Plus size={18}/>
                    Add Contact
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit(handleAddContact)}>
                    <DialogHeader>
                        <DialogTitle>Add New Contact</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="firstname">Firstname</Label>
                            <Input
                                id="firstname"
                                {...register('first_name', {required: true})}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="lastname">Lastname</Label>
                            <Input
                                id="lastname"
                                {...register('last_name', {required: true})} // Matches defaultValues
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="email">email</Label>
                            <Input id="email" placeholder='test@example.com'
                                   {...register('email', {required: true})}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="phone">phone</Label>
                            <Input id="phone"
                                   {...register('phone', {required: true})}
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type='submit' disabled={isLoading}>
                            {isLoading ? <Spinner className='size-3'/> : "Add Contact"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
