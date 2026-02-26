"use client"
import {Button} from "@/components/ui/button";

interface AddButtonProps {
    onClick: () => void;
}

export const AddButton = (
    {
        onClick
    } : AddButtonProps
) => {
    return (
        <>
            <Button
                onClick={onClick}
                variant="outline" className="cursor-pointer bg-primary text-background hover:bg-secondary">
                Add New Address
            </Button>
        </>
    );
};
