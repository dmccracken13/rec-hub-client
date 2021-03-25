import React, { useState, useEffect, useContext } from "react"
import { ContainerContext } from "../containers/ContainerProvider"
import { ItemContext } from "../items/ItemProvider"
import { Item } from "../items/Item"
import "./Container.css"


export const ContainerDetails = (props) => {
    const { containers, getContainers } = useContext(ContainerContext)
    const { items, getItems, filteredItems, setFilteredItems } = useContext(ItemContext)

    const [container, setContainer] = useState({})

    useEffect(() => {
        getContainers()
            .then(getItems)
    }, [])

    useEffect(() => {
        const container = containers.find(c => c.id === parseInt(props.match.params.containerId)) || {}
        setContainer(container)
    }, [containers])

    useEffect(() => {
        const newItems = items.filter(i => i.container !== null)
        setFilteredItems(newItems)
    }, [items])

    return (
        <section className="container">
            <h3 className="container__name">{container.name}</h3>
            <h3 className="h3">Items</h3>
            <div>
                {filteredItems
                    // .filter(i => i.container !== null)
                    .filter(i => i.container.id === container.id)
                    .map(item => {
                        return<Item key={item.id} 
                        item={item} 
                        props={props}
                    />
                    })}
            </div>
        </section>
    )
}