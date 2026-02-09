"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import HeaderWrapper from './HeaderWrapper';
import { User } from '../types/interfaces';

const PUBLIC_PATHS = ['/login', '/signup'];

interface ContainerProps {
    children: React.ReactNode;
    user: User | null;
}

export const Container: React.FC<ContainerProps> = ({ children, user }) => {
    const pathname = usePathname();
    const isPublicPath = PUBLIC_PATHS.includes(pathname);

    // If it's a login/signup page, just render the content directly
    if (isPublicPath) {
        return <main className="min-h-screen bg-white">{children}</main>;
    }

    return (
        <div className="flex min-h-screen font-poppins text-primary">
            <aside className="w-64 fixed inset-y-0 left-0 z-50 bg-gray-100 border-r border-gray-200">
                <Sidebar />
            </aside>

            {/* Content Area: Pushed to the right by ml-64 */}
            <div className="flex flex-col flex-1 ml-64">
                <HeaderWrapper user={user!} />
                <main className="p-6 bg-white flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
};