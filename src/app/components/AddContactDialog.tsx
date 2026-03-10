"use client"
import React, {useEffect, useState} from 'react'
import {
    DialogHeader,
    DialogTitle,
    DialogClose, DialogFooter
} from '@/components/ui/dialog';
import {Field, FieldGroup} from "@/components/ui/field"
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import Cookies from "js-cookie";
import {FieldValues, useForm, SubmitHandler} from 'react-hook-form';
import {toast} from 'sonner';
import {Spinner} from '@/components/ui/spinner';
import {UpdateModalContainer} from "@/app/components/UpdateModalContainer";
import {ContactPayload} from "@/app/types/interfaces";


interface AddContactDialogProps {
    isOpen: boolean;
    onClose: () => void;
    handleAddContact: (contact: ContactPayload) => void;
    isLoading: boolean;
}

export const AddContactDialog: React.FC<AddContactDialogProps> = (
    {
        isOpen,
        onClose,
        isLoading,
        handleAddContact,
    }
) => {
    const {
        reset,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ContactPayload>()

    useEffect(() => {
        reset({
            first_name: "",
            last_name: "",
            email: "",
            phone: ""
        })
    }, [reset]);

    const onHandleAddContact: SubmitHandler<ContactPayload> = async (values) => {
       try{
           handleAddContact(values);
       }catch (e: unknown) {
           if(e instanceof Error) {
               toast.error(e.message);
           }
       }finally {
           onClose();
       }
    }
    return (
        <UpdateModalContainer
            title="Add contact"
            isOpen={isOpen}
            onChange={(open) => !open && onClose()}
        >
            <form onSubmit={handleSubmit(onHandleAddContact)}>
                <FieldGroup className="mt-5">
                    <Field>
                        <Label htmlFor="firstname">Firstname</Label>
                        <Input
                            id="firstname"
                            placeholder="First name"
                            {...register('first_name', {required: true})}
                        />
                        {
                            errors.first_name && (
                                <p className="text-destructive text-[12px]">First Name is Required</p>
                            )
                        }
                    </Field>
                    <Field>
                        <Label htmlFor="lastname">Lastname</Label>
                        <Input
                            placeholder="last name"
                            id="lastname"
                            {...register('last_name')} // Matches defaultValues
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
        </UpdateModalContainer>
    )
}
