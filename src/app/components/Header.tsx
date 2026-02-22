import React from "react";

interface HeaderProps {
    title: string,
    desc: string,
    children : React.ReactNode
}

export const Header = ({
                           title, desc , children
                       }: HeaderProps) => {
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                        <p className="text-gray-500">{desc}</p>
                    </div>
                </div>
                { children }
            </div>
        </>
    );
};
