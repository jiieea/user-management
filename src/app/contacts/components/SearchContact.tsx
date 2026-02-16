"use client"
import React, {useEffect} from 'react'
import useDebounce from "@/app/hook/useDebounce";
import {useRouter} from "next/navigation";
import qs from 'query-string'
import {useSearchContext} from "@/provider/SearchProvider";

const SearchContact = () => {
    const router = useRouter();
    const { searchValue, setSearchValue } = useSearchContext();
    const debouncedValue = useDebounce<string>(searchValue, 500);

    useEffect(() => {
        if (!debouncedValue) {
            router.push('/contacts');
            return;
        }

        const url = qs.stringifyUrl({
            url: '/contacts',
            query: { query: debouncedValue }
        }, {
            skipEmptyString: true,
            skipNull: true
        });

        router.replace(url);
    }, [router, debouncedValue]);

    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search name, email, or phone..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pl-10 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            {/* Search Icon */}
            <div className="absolute left-3 top-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>
    )
}

export default SearchContact;