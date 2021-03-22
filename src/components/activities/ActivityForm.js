import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityContext } from "./ActivityProvider"
import "./Activity.css"

export const ActivityForm = (props) => {
    const { register, handleSubmit, reset } = useForm();
    const { activities, addActivity, getActivities, updateActivity} = useContext(ActivityContext)
    const editMode = props.match.params.hasOwnProperty("activityId")

    const [activity, setActivity] = useState({})

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newActivity = Object.assign({}, activity)
        newActivity[event.target.name] = event.target.value
        setActivity(newActivity)
    }

    const getActInEditMode = () => {
        if (editMode) {
            const actId = parseInt(props.match.params.activityId)
            const selectedAct = activities.find(a => a.id === actId) || {}
            setActivity(selectedAct)
        }
    }
    
    const createNewActivity = (data) => {
        const newActObj = {
            name: data.name
        }
        addActivity(newActObj)
        .then(props.history.push(`/`))
        reset("")
    }

    const putUpdatedAct= (data) => {
        // create a new activity object to get passed through addActivity to be posted to the db
        const editedActObj = {
        id: activity.id,
        name: data.name
        } 
       // addDocumentary is invoked with newDocObj being passed as the argument 
        updateActivity(editedActObj)
        .then(props.history.push(`/`))
    }

    useEffect(()=>{
        getActivities()
    },  [])

    useEffect(()=>{
        getActInEditMode()
    }, [activities])

    if(editMode) {
        return(
            <form className="activity_form" onSubmit={handleSubmit(putUpdatedAct)}>
                <div className="column">
                    <h5>Edit an activity </h5>
                    <input name="name" type="text" value={activity.name} onChange={handleControlledInputChange} ref={register({ required: true })} />
                    <button className="btn btn-dark" type="submit">Submit</button>
                </div>
            </form>
    )} else {
        return(    
            <form className="activity_form" onSubmit={handleSubmit(createNewActivity)}>
                <div className="column">
                    <h5>Add new activity </h5>
                    <input name="activity" type="text" defaultValue="" ref={register({ required: true })} />
                    <button className="btn btn-dark" type="submit">Submit</button>
                </div>
            </form>
    )}

}