import React, { useContext, useEffect } from "react"
import { ItemContext } from "../items/ItemProvider"
import { Item } from "./Item"
import "./Item.css"

export const ItemList = () => {
    const { items, getItems } = useContext(ItemContext)
    
    useEffect(()=>{
        getItems()
    }, [])

    return (
        <>
            <div className="column">
            <h1>Items</h1>
                <div className="column">
                    {items
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