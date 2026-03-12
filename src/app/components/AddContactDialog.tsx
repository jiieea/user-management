"use client"
import React, {useEffect} from 'react'
import {
    DialogClose, DialogFooter
} from '@/components/ui/dialog';
import {Field, FieldGroup} from "@/components/ui/field"
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useForm, SubmitHandler} from 'react-hook-form';
import {toast} from 'sonner';
import {Spinner} from '@/components/ui/spinner';
import {UpdateModalContainer} from "@/app/components/UpdateModalContainer";
import {ContactPayload , AddContactDialogProps} from "@/app/types/interfaces";
import {twMerge} from "tailwind-merge";



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
        formState: {errors},
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
        try {
            await handleAddContact(values);
            onClose();
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
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
                        <Label htmlFor="firstname" className="text-primary font-semibold">Firstname</Label>
                        <Input
                            id="firstname"
                            className="text-black"
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
                        <Label htmlFor="lastname" className="text-primary font-semibold">Lastname</Label>
                        <Input
                            className="text-black"
                            placeholder="last name"
                            id="lastname"
                            {...register('last_name')} // Matches defaultValues
                        />

                    </Field>
                    <Field>
                        <Label htmlFor="email" className="text-primary font-semibold">email</Label>
                        <Input id="email" placeholder='test@example.com'
                               className="text-black"
                               {...register('email', {required: true})}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="phone" className="text-primary font-semibold">phone</Label>
                        <Input id="phone"
                               className="text-black"
                               {...register('phone', {required: true})}
                        />
                    </Field>
                </FieldGroup>
                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="outline"
                                className={twMerge('text-primary font-semibold', isLoading && ('cursor-not-allowed'))}>Cancel</Button>
                    </DialogClose>
                    <Button type='submit' disabled={isLoading}>
                        {isLoading ? <Spinner className='size-3'/> : "Add Contact"}
                    </Button>
                </DialogFooter>
            </form>
        </UpdateModalContainer>
    )
}
