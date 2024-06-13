import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const handle = setTimeout(() => {
            setDebounceValue(value);
        }, delay)
    }, [value, delay])
    return debounceValue;
}
export default useDebounce;