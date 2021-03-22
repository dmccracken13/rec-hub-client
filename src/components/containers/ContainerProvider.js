import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const ContainerContext = React.createContext()

/*
    This component establishes what data can be used.
 */
export const ContainerProvider = (props) => {
    const [containers, setContainers] = useState([])

    const getContainers = () => {
        return fetch("http://localhost:8000/containers", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rh_token")}`
            }
        }) 
            .then(res => res.json())
            .then(setContainers)
    }

    const addContainer = container => {
        return fetch("http://localhost:8000/containers", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rh_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(container)
        })
            .then(getContainers)
    }

    const removeContainer = containerId => {
        return fetch(`http://localhost:8000/containers/${containerId}`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rh_token")}`
            }
        })
            .then(getContainers)
    }

    const updateContainer = container => {
        return fetch(`http://localhost:8000/containers/${container.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rh_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(container)
        })
            .then(getContainers)
    }

    /*
        You return a context provider which has the
        `container` state, the `addContainer` function,
        the `getContainer` function, the `removeContainer` function,
        and the `updateContainer` function as keys. This
        allows any child elements to access them.
    */
    return (
        <ContainerContext.Provider value={{
            containers, addContainer, getContainers, removeContainer, updateContainer
        }}>
            {props.children}
        </ContainerContext.Provider>
    )
}