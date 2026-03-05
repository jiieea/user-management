import React from "react";
import AddressContainer from "@/app/address/component/AddressContainer";
interface PageProps {
    params: Promise<{ id: string }>;
}

const AddressesPage: React.FC<PageProps> = async ({params}) => {
    const {id} = await params;
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <AddressContainer contactId={Number(id)}/>
        </div>
    );
};

export default AddressesPage;
