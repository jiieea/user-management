"use client"
import {useEffect, useState} from "react";
import {UpdateModalContainer} from "@/app/components/UpdateModalContainer";
import {Contact} from "@/app/types/interfaces";
import {
    DialogClose, DialogFooter
} from '@/components/ui/dialog';
import {Field, FieldGroup} from "@/components/ui/field"
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useRouter} from "next/navigation";
import {Spinner} from "@/components/ui/spinner";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {toast} from "sonner";
import Cookies from "js-cookie";


interface EditContactModalProps {
    contact: Contact
    isOpen: boolean,
    onClose: () => void;
}

export const EditContactModal: React.FC<EditContactModalProps> = (
    {
        contact,
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
        handleSubmit
    } = useForm<FieldValues>();

    useEffect(() => {
        reset({
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone,
        })
    }, [reset, contact]);

    const handleEditContact: SubmitHandler<FieldValues> = async (values) => {
        setIsLoading(true);
        try {
            const response = await
                fetch(`${process.env.NEXT_PUBLIC_CONTACT_API}/${contact.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token!
                    },
                    body: JSON.stringify(values)
                })

            const result = await response.json();
            if (!response.ok) {
                toast.error(result.errors.error);
                return;
            }
            toast.success("Contact Updated");
            router.refresh();
            onClose();
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <UpdateModalContainer
                title="Edit Contact"
                isOpen={isOpen}
                onChange={(open) => !open && onClose()}
            >
                <form onSubmit={handleSubmit(handleEditContact)}>
                    <FieldGroup className="mt-5">
                        <Field>
                            <Label htmlFor="firstname" className="text-primary font-semibold">Firstname</Label>
                            <Input
                                id="firstname"
                                placeholder="First name"
                                className="text-primary"
                                {...register('first_name')}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="lastname" className="text-primary font-semibold">Lastname</Label>
                            <Input
                                placeholder="last name"
                                id="lastname"
                                {...register('last_name')}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="email" className="text-primary font-semibold">email</Label>
                            <Input id="email" placeholder='test@example.com'
                                   {...register('email')}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="phone" className="text-primary font-semibold">phone</Label>
                            <Input id="phone"
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












































