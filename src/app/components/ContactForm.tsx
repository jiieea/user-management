"use client"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Field, FieldGroup} from "@/components/ui/field";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";
import React from "react";
import {useForm, SubmitHandler, FieldValues} from "react-hook-form";
import {ContactModalForm} from "@/app/types/interfaces";
import {toast} from "sonner";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

export const EditContact: React.FC<ContactModalForm> = (
    {
        contact
    }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const router = useRouter();
    const token = Cookies.get("token");
    const {
        handleSubmit,
        reset,
        register
    } = useForm<FieldValues>(
        {
            defaultValues: {
                first_name: contact?.first_name,
                last_name: contact?.last_name || "",
                email: contact?.email,
                phone: contact?.phone
            }
        }
    );

    const handleUpdateContact: SubmitHandler<FieldValues> = async (values) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_CONTACT_API}/${contact?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': token!
                },
                body: JSON.stringify(values)
            })
            const result = await response.json();
            if (!response.ok) {
                const errorMessage =
                    response.status === 404
                        ? result.errors
                        : result.errors || "Request failed.";
                toast.error(`Error: ${errorMessage}`);
                return;
            }
            reset();
            router.refresh();
            toast.success("Contact successfully updated");
        } catch (e) {
            if (e instanceof Error) {
                toast.error(e.message)
            }
        }
    }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <button className="text-primary hover:underline text-sm font-medium mr-4">Edit</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <form onSubmit={handleSubmit(handleUpdateContact)}>
                        <DialogHeader>
                            <DialogTitle className="text-xl">Edit Contact</DialogTitle>
                        </DialogHeader>
                        <FieldGroup className="mt-2">
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
                                {isLoading ? <Spinner className='size-3'/> : "Save"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
