import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const ActivityContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const ActivityProvider = (props) => {
    const [activities, setActivities] = useState([])

    const getActivities = () => {
        return fetch("http://localhost:8000/activities", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rh_token")}`
            }
        }) 
            .then(res => res.json())
            .then(setActivities)
    }

    const addActivity = activity => {
        return fetch("http://localhost:8000/activities", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(activity)
        })
            .then(getActivities)
    }

    /*
        You return a context provider which has the
        `categories` state, the `addcategories` function,
        and the `getCategory` function as keys. This
        allows any child elements to access them.
    */
    return (
        <ActivityContext.Provider value={{
            activities, addActivity, getActivities
        }}>
            {props.children}
        </ActivityContext.Provider>
    )
}