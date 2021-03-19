import React from "react"

// component responsible for rendering a single item

export const Item= ({ item }) => (
    <section className="item">
        <div className="item__name">{item.name}</div>
        <div className="item__name">{item.quantity}</div>
        <div className="item__name">{item.type}</div>
        <div className="item__name">{item.status}</div>
        <div className="item__name">{item.activity}</div>
    </section>
)