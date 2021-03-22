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
    const { items, getItems, addItem, updateItem } = useContext(ItemContext)
    const { statuses, getStatuses} = useContext(StatusContext)
    const { types, getTypes} = useContext(TypeContext)    
    const { activities, getActivities} = useContext(ActivityContext)    
    const { containers, getContainers} = useContext(ContainerContext) 
    const [item, setItem] = useState({status:{}, type:{}, container:{}, activity:{}})
    
    const editMode = props.match.params.hasOwnProperty("itemId")

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newItem = Object.assign({}, item)
        newItem[event.target.name] = event.target.value
        setItem(newItem)
    }
    
    const getItemInEditMode = () => {
        if (editMode) {
            const itemId = parseInt(props.match.params.itemId)

            const selectedItem = items.find(i => i.id === itemId) || {status:{}, type:{}, container:{}, activity:{}}
            setItem(selectedItem)
        }
    }

    const createNewItem = (data) => {
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
        reset("")
        
    }

    const putUpdatedItem= (data) => {
        // create a new item object to get passed through updateActivity to be posted to the db
        const cont = data.container !=="0" ? data.container : null
        const editedItemObj = {
            id: item.id,
            name: data.name,
            status: data.status,
            type: data.type,
            quantity: data.quantity,
            activity: data.activity,
            container: cont
        } 
       // updateActivity is invoked with editedActObj being passed as the argument 
        updateItem(editedItemObj)
        .then(props.history.push(`/`))
    }

    useEffect(()=>{
        getActivities()
        .then(getTypes)
        .then(getStatuses)
        .then(getContainers)
        .then(getItems)
    },  [])

    useEffect(()=>{
        getItemInEditMode()
    }, [items])

    if(editMode) {
        return(
            <>    
                <form className="item_form" onSubmit={handleSubmit(putUpdatedItem)}>
                    <div className="column">
                        <h5>Edit an item </h5>
                        <input name="name" type="text" value={item.name} onChange={handleControlledInputChange} ref={register({ required: true })} />
                    </div>
                    <label>Choose a status</label>
                    <select name="status" value={item.status.id} onChange={handleControlledInputChange} ref={register({ required: true })}>
                        <option value="0">Select...</option>
                            {statuses.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                    </select>
                    <label>Choose a type</label>
                    <select name="type" value={item.type.id} onChange={handleControlledInputChange} ref={register({ required: true })}>
                        <option value="0">Select...</option>
                            {types.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                    </select>
                    <label>Quantity</label>
                    <input name="quantity" type="integer" value={item.quantity} onChange={handleControlledInputChange} ref={register({ required: true })} />
                    <label>Choose an activity </label>
                    <select name="activity" value={item.activity.id} onChange={handleControlledInputChange} ref={register({ required: true })}>
                        <option value="0">Select...</option>
                            {activities.map(a => (
                                <option key={a.id} value={a.id}>
                                    {a.name}
                                </option>
                            ))}
                    </select>
                    <label>Choose a container</label>
                    <select name="container" value={item.container === null ? "0" : item.container.id} onChange={handleControlledInputChange} ref={register({ required: true })}>
                        <option value="0">Select...</option>
                            {containers.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                    </select>
                    <button className="btn btn-dark" type="submit">Save</button>
                </form>
            </>
        )} else {
            return(
                <>    
                    <form className="item_form" onSubmit={handleSubmit(createNewItem)}>
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
            )}
}