import React from 'react'

const SearchContact = () => {
    return (
        <div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex gap-4">
                <input
                    type="text"
                    placeholder="Search contacts..."
                    className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
            </div>
        </div>
    )
}

export default SearchContact
