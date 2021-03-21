import React, { useContext } from "react"
import { ItemContext } from "./ItemProvider"

// component responsible for rendering a single item

export const Item= ({ item, props }) => {
    const { removeItem } = useContext(ItemContext)

    return(
        <section className="item">
            <div className="item__name">{item.name}</div>
            <div className="item__name">Quantity: {item.quantity}</div>
            <div className="item__name">Type: {item.type.name}</div>
            <div className="item__name">Status: {item.status.name}</div>
            <div className="item__name">Activity: {item.activity.name}</div>
            <button type="button"className="btn btn-danger" id={item.id}
                        onClick={
                            () => {
                            removeItem(+item.id)  
                                            .then(() => {
                                            props.history.push("/")
                                            })
                            }
                        }>
                        Delete
            </button> 
        </section>
    )
}