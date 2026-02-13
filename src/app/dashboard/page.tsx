import React from 'react';
import { Users, Star, Clock } from 'lucide-react'; // Optional: Use lucide-react for icons
import { getContact } from '../action/getContact';
import StatCard from '../components/StatsCard';
import { ContactTable } from '../components/ContactTable';
import { AddContactDialog } from '../components/AddContactDialog';
export default async function DashboardPage() {
    const contacts = await getContact();
    // i wanna call the action here
    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                    <p className="text-gray-500">Welcome back! Here’s what’s happening with your network.</p>
                </div>
              <AddContactDialog />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Contacts" value={JSON.stringify(contacts?.length)} icon={<Users className="text-blue-600" />} bgColor="bg-blue-50" />
                <StatCard title="Favorites" value="1" icon={<Star className="text-yellow-600" />} bgColor="bg-yellow-50" />
                <StatCard title="Recently Added" value="2" icon={<Clock className="text-green-600" />} bgColor="bg-green-50" />
            </div>
            <ContactTable contacts={contacts!} />
        </div>
    );
}

