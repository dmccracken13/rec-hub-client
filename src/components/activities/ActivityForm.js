import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ActivityContext } from "./ActivityProvider"
import "./Activity.css"

export const ActivityForm = (props) => {
    const { register, handleSubmit, reset } = useForm();
    const { addActivity } = useContext(ActivityContext)
    
    
    const onSubmit = (data) => {
        if (data) {
        const newActObj = {
            name: data.activity
        }
        addActivity(newActObj)
        }
        reset("")
    }

    return(
        <form className="activity_form" onSubmit={handleSubmit(onSubmit)}>
            <div className="column">
                <h5>Add new activity </h5>
                <input name="activity" type="text" defaultValue="" ref={register({ required: true })} />
                <button className="btn btn-dark" type="submit">Submit</button>
            </div>
        </form>
    )

}