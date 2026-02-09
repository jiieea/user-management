"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Contacts',  link: '/contacts' },
    { name: 'Address',   link: '/addresses' }
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col h-full p-4">
            <div className="px-2 mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Menu</h2>
            </div>

            <div className="flex flex-col gap-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.link;
                    
                    return (
                        <Link
                            key={item.link}
                            href={item.link}
                            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                                isActive
                                    ? "bg-primary text-white shadow-md"
                                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                            }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}