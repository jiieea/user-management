import React from 'react';

const Skeleton = () => {
    return (
        <>
            <tr className="bg-white hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                    <div className="flex items-center gap-3 animate-pulse">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"></div>
                        <div>
                            <p className="font-semibold bg-gray-300 h-4 w-32 rounded"></p>
                            <p className="bg-gray-300 h-3 w-24 rounded text-xs"></p>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                        <button className="p-2 rounded-full bg-gray-300 animate-pulse"></button>
                        <button className="p-2 rounded-full bg-gray-300 animate-pulse"></button>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default Skeleton;
