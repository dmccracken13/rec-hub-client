import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ContainerContext } from "./ContainerProvider"
import "./Container.css"

export const ContainerForm = (props) => {
    const { register, handleSubmit, reset } = useForm();
    const { addContainer } = useContext(ContainerContext)
    const history = useHistory()   
    
    const onSubmit = (data) => {
        if (data) {
        const newContObj = {
            name: data.container
        }
        addContainer(newContObj)
        .then(history.push(`/`))
        }
        reset("")
    }

    return(
        <form className="container_form" onSubmit={handleSubmit(onSubmit)}>
            <div className="column">
                <h5>Add new container </h5>
                <input name="container" type="text" defaultValue="" ref={register({ required: true })} />
                <button className="btn btn-dark" type="submit">Save</button>
            </div>
        </form>
    )

}