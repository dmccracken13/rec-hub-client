import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ItemContext } from "./ItemProvider"
import "./Item.css"

export const ItemForm = (props) => {
    const { register, handleSubmit, reset } = useForm();
    const { addItem } = useContext(ItemContext)
    
    
    const onSubmit = (data) => {
        if (data) {
        const newItemObj = {
            name: data.itemName
        }
        addItem(newItemObj)
        }
        reset("")
    }

    return(
        <form className="item_form" onSubmit={handleSubmit(onSubmit)}>
            <div className="column">
                <h5>Add new items </h5>
                <input name="itemName" type="text" defaultValue="" ref={register({ required: true })} />
                <button className="btn btn-dark" type="submit">Submit</button>
            </div>
        </form>
    )

}