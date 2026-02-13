// app/addresses/page.tsx
import React from 'react';
import {getAddressById} from "@/app/action/getAddress";

interface PageProps {
    params: Promise<{ id: string }>
}

const AddressesPage: React.FC<PageProps> =async (
    {
        params
    }
) =>  {
    const { id } = await params;
    const addresses = await getAddressById(id);
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Contact Directory: Addresses ${addresses?.length}</h1>

            <div className="grid gap-6">

                <div  className="border rounded-lg p-4 bg-white shadow-sm">
                    <h2 className="text-lg font-semibold border-b pb-2 mb-3">Test</h2>

                    <div className="space-y-3">
                        <div  className="text-sm">
                            <span className="font-medium text-blue-600">software engineer</span>
                            <p>jalan, kota</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddressesPage;