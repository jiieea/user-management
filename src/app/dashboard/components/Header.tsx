"use client"
import { LogoutButton } from "@/app/dashboard/components/LogoutButton";

interface HeaderProps {
    user?: { // Make the whole user object optional
        username?: string;
        name?: string;
    }
}

export function Header({ user }: HeaderProps) {
    // Safe access: if user is undefined, it defaults to "Unknown User"
    const displayName = user?.username || user?.name || "Guest";
    return (
        <header className="w-[86%] rounded-2xl h-20 bg-white px-8 py-5 flex items-center justify-between shadow-md fixed top-0">
            <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    <p className="text-lg hidden md:block">Contact Management</p>
                    <p className="text-xs text-primary hidden md:block">Where all contacts Gather</p>
                </div>
            </div>
            <div className="flex gap-x-3 items-center">
                <p className="text-primary text-sm font-normal">
                    Halo, <span className="text-primary font-semibold">{displayName}</span>
                </p>
                <LogoutButton />
            </div>
        </header>
    );
}