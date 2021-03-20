import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const ItemContext = React.createContext()

/*
    This component establishes what data can be used.
 */
export const ItemProvider = (props) => {
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])

    const getItems = () => {
        return fetch("http://localhost:8000/items", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rh_token")}`
            }
        }) 
            .then(res => res.json())
            .then(setItems)
    }

    const addItem = item => {
        return fetch("http://localhost:8000/items", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rh_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
            .then(getItems)
    }

    const removeItem = itemId => {
        return fetch(`http://localhost:8000/items/${itemId}`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rh_token")}`
            }
        })
            .then(getItems)
    }

    const updateItem = item => {
        return fetch(`http://localhost:8000/containers/${item.id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rh_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
            .then(getItems)
    }

    /*
        You return a context provider which has the
        `item` state, the `addItem` function, the `removeItem` function,
        the `updateItem` function, and the `getItem` function as keys. This
        allows any child elements to access them.
    */
    return (
        <ItemContext.Provider value={{
            items, filteredItems, addItem, getItems, removeItem, updateItem, setItems, setFilteredItems 
        }}>
            {props.children}
        </ItemContext.Provider>
    )
}