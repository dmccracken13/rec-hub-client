import React, { useContext, useEffect } from "react"
import { ItemContext } from "../items/ItemProvider"
import { Item } from "./Item"
import "./Item.css"

export const ItemList = (props) => {
    const { items, getItems, filteredItems, setFilteredItems } = useContext(ItemContext)
    
    useEffect(()=>{
        getItems()
    }, [])

    useEffect(()=>{
        const newItems = items.filter(i => i.container === null)
        setFilteredItems(newItems)
    }, [items])

    return (
        <>
            <div className="column">
            <h1>Items</h1>
            <button className="btn btn-secondary" onClick={() => {
                    props.history.push(`/items/add`)
                }}>New Item                
            </button>
                <div className="column">
                    {filteredItems
                    .map(item => {
                            return <Item key={item.id} 
                            item={item} 
                            />
                    })
                    }
                </div>
            </div>
        </>
    )
}