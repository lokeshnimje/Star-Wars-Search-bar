import {useState, useEffect} from "react"

// creating a custom hook to limit api call on live search
const useDebouncer = (name)=>{
    const [value, setValue] = useState(name); // saving the debounced value to a state.
    useEffect(()=>{
        const debounce = setTimeout(()=>{
            setValue(name);
        }, 700)

        return ()=>{ // a cleanup function to clear timeout every time the "name - argument" changes(provided in dependency array)
            clearTimeout(debounce)
        }
    }, [name]) //will recall effect when "name - argument" changes

    return value
}

export default useDebouncer
