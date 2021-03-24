import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory} from "react-router-dom";
import { ActivityContext } from "./ActivityProvider"
import "./Activity.css"

export const ActivityForm = (props) => {
    const { register, handleSubmit, reset } = useForm();
    const { activities, addActivity, getActivities, updateActivity} = useContext(ActivityContext)
    const [activity, setActivity] = useState({})
    const editMode = props.match.params.hasOwnProperty("activityId")
    const history = useHistory()

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
        .then(history.push(`/`))
        reset("")
    }

    const putUpdatedAct= (data) => {
        // create a new activity object to get passed through updateActivity to be posted to the db
        const editedActObj = {
        id: activity.id,
        name: data.name
        } 
       // updateActivity is invoked with editedActObj being passed as the argument 
        updateActivity(editedActObj)
        .then(history.push(`/`))
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
                    <h5 className="h5">Edit an activity </h5>
                    <input name="name" type="text" value={activity.name} onChange={handleControlledInputChange} ref={register({ required: true })} />
                    <button className="btn btn-dark" type="submit">Save</button>
                </div>
            </form>
    )} else {
        return(    
            <form className="activity_form" onSubmit={handleSubmit(createNewActivity)}>
                <div className="column">
                    <h5 className="h5">Add new activity </h5>
                    <input name="name" type="text" defaultValue="" ref={register({ required: true })} />
                    <button className="btn btn-dark" type="submit">Submit</button>
                </div>
            </form>
    )}

}