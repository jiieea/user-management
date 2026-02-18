"use client";

import {UpdateModalContainer} from "@/app/components/UpdateModalContainer";
import {Address} from "@/app/types/interfaces";
import React, {useState, useEffect} from "react";
import {DialogFooter} from "@/components/ui/dialog";
import {Field, FieldGroup} from "@/components/ui/field";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
    useForm,
    SubmitHandler,
    FieldValues,
} from "react-hook-form";
import {Spinner} from "@/components/ui/spinner";
import {toast} from "sonner";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

interface EditAddressModalProps {
    address: Address;
    contactId: number;
    isOpen: boolean;
    onClose: () => void;
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({
                                                               address,
                                                               contactId,
                                                               isOpen,
                                                               onClose,
                                                           }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const token = Cookies.get("token");

    const {reset, handleSubmit, register} = useForm<FieldValues>();

    // IMPORTANT: reset setiap address berubah
    useEffect(() => {
        reset({
            street: address.street || "",
            city: address.city || "",
            province: address.province || "",
            country: address.country,
            postal_code: address.postal_code,
        });
    }, [address, reset]);

    const handleUpdateAddress: SubmitHandler<FieldValues> =
        async (values) => {
            setIsLoading(true);

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_ADDRESS_API}/${contactId}/addresses/${address.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token!,
                        },
                        body: JSON.stringify(values),
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    toast.error(result.errors || "Update failed");
                    return;
                }

                toast.success("Address updated successfully");
                onClose();
                router.refresh();
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

    return (
        <UpdateModalContainer
            title="Edit Address"
            isOpen={isOpen}
            onChange={(open) => !open && onClose()}
        >
            <form onSubmit={handleSubmit(handleUpdateAddress)}>
                <FieldGroup className="mt-5">
                    <Field>
                        <Label className="text-primary font-semibold">Street</Label>
                        <Input {...register("street")} className="text-secondary-foreground"/>
                    </Field>

                    <Field>
                        <Label className="text-primary font-semibold">City</Label>
                        <Input {...register("city")}  className="text-secondary-foreground"/>
                    </Field>

                    <Field>
                        <Label className="text-primary font-semibold">Province</Label>
                        <Input {...register("province")}  className="text-secondary-foreground" />
                    </Field>

                    <Field>
                        <Label className="text-primary font-semibold">Country</Label>
                        <Input {...register("country", {required: true})}   className="text-secondary-foreground"/>
                    </Field>

                    <Field>
                        <Label className="text-primary font-semibold">Postal Code</Label>
                        <Input {...register("postal_code", {required: true})}   className="text-secondary-foreground"/>
                    </Field>
                </FieldGroup>

                <DialogFooter className="mt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <Spinner className="size-3"/> : "Save Changes"}
                    </Button>
                </DialogFooter>
            </form>
        </UpdateModalContainer>
    );
};

export default EditAddressModal;
