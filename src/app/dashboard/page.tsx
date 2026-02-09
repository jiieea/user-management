import React from 'react';
import { User, Users, Star, Clock } from 'lucide-react'; // Optional: Use lucide-react for icons
import { getContact } from '../action/getContact';
import StatCard from '../components/StatsCard';
import { ContactTable } from '../components/ContactTable';
import { AddContactDialog } from '../components/AddContactDialog';
export default async function DashboardPage() {
    const contacts = await getContact();
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Contacts" value={contacts?.length} icon={<Users className="text-blue-600" />} bgColor="bg-blue-50" />
                <StatCard title="Favorites" value="1" icon={<Star className="text-yellow-600" />} bgColor="bg-yellow-50" />
                <StatCard title="Recently Added" value="2" icon={<Clock className="text-green-600" />} bgColor="bg-green-50" />
                <StatCard title="Total Addresses" value="0" icon={<User className="text-purple-600" />} bgColor="bg-purple-50" />
            </div>

            <ContactTable contacts={contacts!} />
        </div>
    );
}

