import React, { useContext } from "react"
import { useHistory } from "react-router-dom";
import { ItemContext } from "./ItemProvider"
import "./Item.css"

// component responsible for rendering a single item

export const Item= ({ item, props }) => {
    const { removeItem } = useContext(ItemContext)
    const history = useHistory()

    return(
        <>    
            <section className="card d-flex justify-content-center" style={{ width: '8rem' }}>
                <div className="item__name">{item.name}</div>
                <div className="item__name">Quantity: {item.quantity}</div>
                <div className="item__name">Type: {item.type.name}</div>
                <div className="item__name">Status: {item.status.name}</div>
                <div className="item__name">Activity: {item.activity.name}</div>
            </section>
            <button className="btn btn-warning" 
                onClick={() => {
                    history.push(`/items/edit/${item.id}`)
                }}>
            Edit
            </button>
            <button type="button"className="btn btn-danger" id={item.id}
                onClick={() => {
                    removeItem(+item.id)  
                    .then(() => {
                        history.push("/")
                    })
                }}>
            Delete
            </button> 
        </>
    )
}