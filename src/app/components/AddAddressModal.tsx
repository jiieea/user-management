"use client"
import {UpdateModalContainer} from "@/app/components/UpdateModalContainer";
import React, {useEffect, useState} from "react";
import {DialogFooter} from "@/components/ui/dialog";
import {Field, FieldGroup} from "@/components/ui/field";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Cookies from "js-cookie";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

interface AddModalProps {
    isOpen: boolean;
    contactId: number;
    onClose: () => void;

}

export const AddModal: React.FC<AddModalProps> = (
    {
        contactId,
        isOpen,
        onClose,
    }
) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        reset, register, handleSubmit
    } = useForm<FieldValues>();
    const token = Cookies.get('token');

    useEffect(() => {
        reset(
            {
                street:  "",
                city: "",
                province: "",
                country:"" ,
                postal_code: "",
            }
        )
    }, [reset]);

    const handleAddAddress: SubmitHandler<FieldValues> = async (values) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ADDRESS_API}/${contactId}/addresses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token!
                },
                body: JSON.stringify(values),
            })
            const result = await response.json();
            if (!response.ok || response.status === 401) {
                const msg = result.errors || "Unauthorized";
                toast.error(msg);
            }
            router.refresh();
            toast.success("Address added successfully");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
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
                title="Add Address"
                isOpen={isOpen}
                onChange={(open) => !open && onClose()}
            >
                <form onSubmit={handleSubmit(handleAddAddress)}>
                    <FieldGroup className="mt-5">
                        <Field>
                            <Label className="text-primary font-semibold">Street</Label>
                            <Input className="text-secondary-foreground" placeholder="Street name"
                                   {...register('street')}
                            />
                        </Field>

                        <Field>
                            <Label className="text-primary font-semibold">City</Label>
                            <Input className="text-secondary-foreground" placeholder="City name"
                                   {...register('city')}
                            />
                        </Field>

                        <Field>
                            <Label className="text-primary font-semibold">Province</Label>
                            <Input className="text-secondary-foreground" placeholder="Province name"
                                   {...register('province')}
                            />
                        </Field>

                        <Field>
                            <Label className="text-primary font-semibold">Country</Label>
                            <Input className="text-secondary-foreground"
                                   placeholder="Country name" {...register('country', {required: true})}/>
                        </Field>

                        <Field>
                            <Label className="text-primary font-semibold">Postal Code</Label>
                            <Input className="text-secondary-foreground"
                                   placeholder="Postal code" {...register("postal_code", {required: true})}/>
                        </Field>
                    </FieldGroup>

                    <DialogFooter className="mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="text-primary cursor-pointer"
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isLoading} className="cursor-pointer">
                            {isLoading ? <Spinner className="size-3"/> : "Add Address"}
                        </Button>
                    </DialogFooter>
                </form>
            </UpdateModalContainer>
        </>
    );
};
