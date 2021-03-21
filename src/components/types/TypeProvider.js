import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const TypeContext = React.createContext()

/*
    This component establishes what data can be used.
 */
export const TypeProvider = (props) => {
    const [types, setTypes] = useState([])

    const getTypes = () => {
        return fetch("http://localhost:8000/types", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rh_token")}`
            }
        }) 
            .then(res => res.json())
            .then(setTypes)
    }

    /*
        You return a context provider which has the
        `type` state, and the `getTypes` function 
        as keys. This allows any child elements to access them.
    */
    return (
        <TypeContext.Provider value={{
            types, getTypes
        }}>
            {props.children}
        </TypeContext.Provider>
    )
}