"use client";

import { Pencil } from "lucide-react";

interface Props {
    onClick: () => void;
}

export const EditButton: React.FC<Props> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
            title="Edit Address"
        >
            <Pencil size={16} />
        </button>
    );
};
