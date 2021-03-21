import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const StatusContext = React.createContext()

/*
    This component establishes what data can be used.
 */
export const StatusProvider = (props) => {
    const [statuses, setStatuses] = useState([])

    const getStatuses = () => {
        return fetch("http://localhost:8000/statuses", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rh_token")}`
            }
        }) 
            .then(res => res.json())
            .then(setStatuses)
    }

    /*
        You return a context provider which has the
        `status` state, and the `getStatuses` function as keys. This
        allows any child elements to access them.
    */
    return (
        <StatusContext.Provider value={{
            statuses, getStatuses
        }}>
            {props.children}
        </StatusContext.Provider>
    )
}