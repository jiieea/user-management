"use client"
import {usePathname} from "next/navigation";
import Link from "next/link";
export function Sidebar() {
    const pathname = usePathname();
    const paths = [
        {
            name:'Dashboard', link:'/dashboard',
        },
        {
            name:'Contacts', link:'/contacts',
        },
        {
            name: 'Address', link:'/address',
        }
    ]
    return (
        <>
            <nav className="flex flex-col p-4 gap-y-2">
                <h2 className="text-xl font-bold mb-6 px-2">Menu</h2>
                {paths.map((link) => (
                    <Link
                        key={link.link}
                        href={link.link}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            pathname === link.link
                                ? "bg-primary text-white"
                                : "hover:bg-gray-200 text-gray-700"
                        }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav></>
    );
}
