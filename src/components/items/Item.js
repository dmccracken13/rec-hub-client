import React from "react"

// component responsible for rendering a single item

export const Item= ({ item }) => (
    <section className="item">
        <div className="item__name">{item.name}</div>
        <div className="item__name">Quantity: {item.quantity}</div>
        <div className="item__name">Type: {item.type.name}</div>
        <div className="item__name">Status: {item.status.name}</div>
        <div className="item__name">Activity: {item.activity.name}</div>
    </section>
)