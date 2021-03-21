import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ItemContext } from "./ItemProvider"
import { TypeContext } from "../types/TypeProvider"
import { StatusContext } from "../statuses/StatusProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { ContainerContext } from "../containers/ContainerProvider"
import "./Item.css"

export const ItemForm = (props) => {
    const { register, handleSubmit, reset } = useForm();
    const { addItem } = useContext(ItemContext)
    const { statuses, getStatuses} = useContext(StatusContext)
    const { types, getTypes} = useContext(TypeContext)    
    const { activities, getActivities} = useContext(ActivityContext)    
    const { containers, getContainers} = useContext(ContainerContext)    
    
    const onSubmit = (data) => {
        // const cont = null ? "" : data.container
        // const cont = data.container ? data.container : null

        if (data) {
        const cont = data.container !=="0" ? data.container : null
        const newItemObj = {
            name: data.name,
            status: data.status,
            type: data.type,
            quantity: data.quantity,
            activity: data.activity,
            container: cont
        }
        addItem(newItemObj)
        .then(props.history.push(`/`))
        console.log(newItemObj)
        }
        reset("")
    }

    useEffect(()=>{
        getActivities()
        .then(getTypes)
        .then(getStatuses)
        .then(getContainers)
    },  [])

    return(
        <>    
            <form className="item_form" onSubmit={handleSubmit(onSubmit)}>
                <div className="column">
                    <h5>Add new items </h5>
                    <input name="name" type="text" defaultValue="" ref={register({ required: true })} />
                </div>
                <label>Choose a status</label>
                <select name="status" ref={register({ required: true })}>
                    <option value="0">Select...</option>
                        {statuses.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                </select>
                <label>Choose a type</label>
                <select name="type" ref={register({ required: true })}>
                    <option value="0">Select...</option>
                        {types.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.name}
                            </option>
                        ))}
                </select>
                <label>Quantity</label>
                <input name="quantity" type="integer" defaultValue="" ref={register({ required: true })} />
                <label>Choose an activity </label>
                <select name="activity" ref={register({ required: true })}>
                    <option value="0">Select...</option>
                        {activities.map(a => (
                            <option key={a.id} value={a.id}>
                                {a.name}
                            </option>
                        ))}
                </select>
                <label>Choose a container</label>
                <select name="container" ref={register({ required: true })}>
                    <option value="0">Select...</option>
                        {containers.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                </select>
                <button className="btn btn-dark" type="submit">Submit</button>
            </form>
        </>
    )

}