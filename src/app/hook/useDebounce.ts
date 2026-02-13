import {useEffect, useState} from "react";

export default function useDebounce<T>(value: T, delay?: number): T {
    const [debounced, setDebounced] = useState<T>(value);
    useEffect(() => {
        const time = setTimeout(() => {
            setDebounced(value)
        }, delay || 500);

        return () => {
            clearTimeout(time);
        }
    }, [value,  delay]);

    return debounced;
}

