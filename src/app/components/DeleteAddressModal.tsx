"use client"
import {Address} from "@/app/types/interfaces";
import React, {useState} from "react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

interface DeleteAddressModalProps {
    address: Address,
    onClose: () => void,
    contactId: number,
    isOpen: boolean,
    handleDeleteAddress: (contactId: number, addressId: number) => Promise<void>,
}

export function DeleteAddressModal({
                                       address,
                                       isOpen,
                                       onClose,
                                       contactId,
                                       handleDeleteAddress,
                                   }: DeleteAddressModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    if (!isOpen) return null;
    const deleteAddress = async () => {
        setIsLoading(true);
        try {
            await handleDeleteAddress(contactId, address.id);
            toast.success("Address deleted successfully.");
            router.refresh();
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
                            onClick={deleteAddress}
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
