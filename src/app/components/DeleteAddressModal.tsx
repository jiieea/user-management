"use client"
import {Address} from "@/app/types/interfaces";
import React, {useState} from "react";
import {toast} from "sonner";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

interface DeleteAddressModalProps {
    address: Address,
    onClose: () => void,
    contactId: number,
    isOpen: boolean,
}

export function DeleteAddressModal({
                                       address,
                                       isOpen,
                                       onClose,
                                       contactId
                                   }: DeleteAddressModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const token = Cookies.get('token');

    if (!isOpen) return null;
    const handleDeleteAddress = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ADDRESS_API!}/${contactId}/addresses/${address.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token!,
                }
            });
            const result = await response.json();
            if (!response.ok || response.status === 401) {
                const msg = result.message;
                toast.error(msg);
            }

            toast.success('Address has been deleted');
            setIsLoading(false);
            router.refresh();
            onClose();
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
            onClose()
        }
    }
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                    <h2 className="text-lg font-bold text-gray-800">
                        Delete Address
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        This action cannot be undone. The address will be permanently removed.
                    </p>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleDeleteAddress}
                            disabled={isLoading}
                            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                        >
                            {isLoading ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
