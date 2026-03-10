"use client"
import React, {useEffect, useState} from "react";
import {UpdateModalContainer} from "@/app/components/UpdateModalContainer";
import {Contact, ContactPayload} from "@/app/types/interfaces";
import {
    DialogClose, DialogFooter
} from '@/components/ui/dialog';
import {Field, FieldGroup} from "@/components/ui/field"
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useRouter} from "next/navigation";
import {Spinner} from "@/components/ui/spinner";
import {SubmitHandler, useForm} from "react-hook-form";
import {toast} from "sonner";
import Cookies from "js-cookie";


interface EditContactModalProps {
    contact: Contact
    isOpen: boolean,
    onClose: () => void;
    handleEditContact: (contact: ContactPayload, contactId: number) => void;
}

export const EditContactModal: React.FC<EditContactModalProps> = (
    {
        contact,
        handleEditContact,
        isOpen,
        onClose,
    }
) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const token = Cookies.get('token');
    const router = useRouter();
    const {
        reset,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<ContactPayload>();

    useEffect(() => {
        reset({
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone,
        })
    }, [reset, contact]);

    const editContact: SubmitHandler<ContactPayload> = async (values) => {
        setIsLoading(true);
        try {
            handleEditContact(values, Number(contact.id))
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
            onClose();
        }
    }
    return (
        <>
            <UpdateModalContainer
                title="Edit Contact"
                isOpen={isOpen}
                onChange={(open) => !open && onClose()}
            >
                <form onSubmit={handleSubmit(editContact)}>
                    <FieldGroup className="mt-5">
                        <Field>
                            <Label htmlFor="firstname" className="text-primary font-semibold">Firstname</Label>
                            <Input
                                id="firstname"
                                placeholder="First name"
                                className="text-primary"
                                {...register('first_name')}
                            />
                            {
                                errors.first_name && (
                                    <p className="text-destructive text-[12px]">First Name is Required</p>
                                )
                            }
                        </Field>
                        <Field>
                            <Label htmlFor="lastname" className="text-primary font-semibold">Lastname</Label>
                            <Input
                                placeholder="last name"
                                id="lastname"
                                className="text-primary"
                                {...register('last_name')}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="email" className="text-primary font-semibold">email</Label>
                            <Input
                                className="text-primary"
                                id="email" placeholder='test@example.com'
                                {...register('email')}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="phone" className="text-primary font-semibold">phone</Label>
                            <Input id="phone"
                                   className="text-primary"
                                   {...register('phone')}
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
        </>
    )
}












































