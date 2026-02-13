"use client"

import {
    DialogTrigger, Dialog
    , DialogContent, DialogHeader,
    DialogTitle,
    DialogClose, DialogFooter
} from '@/components/ui/dialog';
import {useForm, SubmitHandler, FieldValues} from "react-hook-form";
import {Field, FieldGroup} from "@/components/ui/field";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {CiCirclePlus} from "react-icons/ci";
import {toast} from "sonner";
import {Contact} from "@/app/types/interfaces";
import Cookies from "js-cookie";

interface AddAddressModalProps {
    contact: Contact
}

export const AddAddressModal: React.FC<AddAddressModalProps> = (
    {
        contact,
    }
) => {
    const router = useRouter();
    const token = Cookies.get('token');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        reset,
        handleSubmit,
        register
    } = useForm<FieldValues>({
        defaultValues: {
            street: "",
            city: "",
            province: "",
            country: "",
            postal_code: ""
        }
    })

    const handleCreateAddress: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_CREATE_ADDRESS_API!}/${contact.id}/addresses`, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': token!
                    }
                }
            )
            const result = await response.json();
            console.log(result);
            if (!response.ok) {
                const msg = response.status === 401 || response.status === 404 ? result.errors : result.message;
                toast.error(JSON.stringify(msg));
                return;
            }
            reset();
            router.refresh();
            toast.success("Address added successfully");
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <CiCirclePlus className="text-xl cursor-pointer"/>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <form onSubmit={handleSubmit(handleCreateAddress)}>
                        <DialogHeader>
                            <DialogTitle>Add New Contact</DialogTitle>
                        </DialogHeader>
                        <FieldGroup className="mt-5">
                            <Field>
                                <Label htmlFor="street">Street</Label>
                                <Input
                                    id="street"
                                    placeholder="exp : St.Genie"
                                    {...register('street', {required: true})}
                                />
                            </Field>
                            <Field>
                                <Label htmlFor="city">City</Label>
                                <Input
                                    placeholder="exp : Lyon"
                                    id="city"
                                    {...register('city', {required: true})} // Matches defaultValues
                                />
                            </Field>
                            <Field>
                                <Label htmlFor="province">Province</Label>
                                <Input id="province" placeholder='Province'
                                       {...register('province', {required: true})}
                                />
                            </Field>
                            <Field>
                                <Label htmlFor="country">Country</Label>
                                <Input id="country"
                                       {...register('country', {required: true})}
                                />
                            </Field>
                            <Field>
                                <Label htmlFor="postal_code">Postal Code</Label>
                                <Input id="postal_code"
                                       {...register('postal_code', {required: true})}
                                />
                            </Field>
                        </FieldGroup>
                        <DialogFooter className="mt-4">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type='submit' disabled={isLoading}>
                                {isLoading ? <Spinner className='size-3'/> : "Add Address"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
