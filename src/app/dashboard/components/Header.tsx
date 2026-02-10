"use client"
import { LogoutButton } from "@/app/dashboard/components/LogoutButton";
import { User } from "@/app/types/interfaces";
interface HeaderProps {
    user: User | null; // Keep consistent with your other components
}

export function Header({ user }: HeaderProps) {
    const displayName = user?.name || user?.username || "Guest";

    return (
        <header className="sticky top-0 z-40 w-full h-20 bg-background backdrop-blur-md px-8 flex items-center justify-between border-b border-gray-100 shadow-sm">
            <div className="flex flex-col">
                <p className="text-lg font-bold leading-tight hidden md:block text-gray-800">
                    Contact Management
                </p>
                <p className="text-xs text-primary/70 hidden md:block font-medium">
                    Where all contacts gather
                </p>
            </div>

            <div className="flex items-center gap-x-6">
                <div className="text-right">
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                        Logged in as
                    </p>
                    <p className="text-primary text-sm font-semibold">
                        {displayName}
                    </p>
                </div>
                
                <div className="h-8 w-[1px] bg-gray-200 mx-2" /> {/* Divider */}
                
                <LogoutButton />
            </div>
        </header>
    );
}