"use client"
import {DashBoardHeader} from "@/app/components/DashboardHeader";
import StatCard from "@/app/components/StatsCard";
import {ContactTable} from "@/app/components/ContactTable";
import {Clock, Star, Users} from "lucide-react";
import {useContact} from "@/app/hook/useContact";


export const DashboardContainer = () => {
    const {contacts, addContactService, isLoading, getContacts} = useContact();
    return (
        <>
            {/* Header Section */}
            <DashBoardHeader handleAddContact={addContactService} isLoading={isLoading}/>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Contacts" value={JSON.stringify(contacts?.length)}
                          icon={<Users className="text-blue-600"/>} bgColor="bg-blue-50"/>
                <StatCard title="Favorites" value="1" icon={<Star className="text-yellow-600"/>}
                          bgColor="bg-yellow-50"/>
                <StatCard title="Recently Added" value="2" icon={<Clock className="text-green-600"/>}
                          bgColor="bg-green-50"/>
            </div>
            <ContactTable
                getContacts={getContacts}
                contacts={contacts!}/>
        </>
    );
};
