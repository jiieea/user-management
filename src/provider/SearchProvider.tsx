"use client"
import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
interface SearchContextProps {
    searchValue: string
    setSearchValue : Dispatch<SetStateAction<string>>
}
const SearchContext = createContext<SearchContextProps | undefined>(undefined);

const SearchContextProvider: React.FC<{children: React.ReactNode}>= (
    {
        children
    }
) => {
    const [searchValue, setSearchValue] = useState('');
    const searchContextValue = {
        searchValue,
        setSearchValue
    }

    return(
        <SearchContext.Provider value={searchContextValue}>
            {children}
        </SearchContext.Provider>
    )
}

// hook
export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if(context === undefined) {
        throw new Error("useSearchContext must be used within the context provider");
    }
    return context;
}

export  default  SearchContextProvider