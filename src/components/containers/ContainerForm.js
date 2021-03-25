import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ContainerContext } from "./ContainerProvider"
import "./Container.css"

export const ContainerForm = (props) => {
    const { register, handleSubmit, reset } = useForm();
    const { containers, addContainer, updateContainer, getContainers } = useContext(ContainerContext)
    const history = useHistory()  
    const editMode = props.match.params.hasOwnProperty("containerId") 
    const [container, setContainer] = useState({})

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newContainer = Object.assign({}, container)
        newContainer[event.target.name] = event.target.value
        setContainer(newContainer)
    }

    const getContInEditMode = () => {
        if (editMode) {
            const contId = parseInt(props.match.params.containerId)
            const selectedCont = containers.find(c => c.id === contId) || {}
            setContainer(selectedCont)
        }
    }

    const createNewContainer = (data) => {
        const newContObj = {
            name: data.name
        }
        addContainer(newContObj)
        .then(history.push(`/`))
        reset("")
    }

    const putUpdatedCont= (data) => {
        // create a new container object to get passed through updateActivity to be posted to the db
        const editedContObj = {
        id: container.id,
        name: data.name
        } 
       // updateContainer is invoked with editedContObj being passed as the argument 
        updateContainer(editedContObj)
        .then(history.push(`/`))
    }

    useEffect(()=>{
        getContainers()
    },  [])

    useEffect(()=>{
        getContInEditMode()
    }, [containers])

    if(editMode) {
        return(
            <form className="rec_form" onSubmit={handleSubmit(putUpdatedCont)}>
                <div className="column">
                    <h5 className="h5">Edit a container </h5>
                    <input name="name" type="text" value={container.name} onChange={handleControlledInputChange} ref={register({ required: true })} />
                    <button className="btn btn-secondary" type="submit">Save</button>
                </div>
            </form>
    )} else {
        return(
            <form className="rec_form" onSubmit={handleSubmit(createNewContainer)}>
                <div className="column">
                    <h5 className="h5">Add new container </h5>
                    <input name="name" type="text" defaultValue="" ref={register({ required: true })} />
                    <button className="btn btn-secondary" type="submit">Save</button>
                </div>
            </form>
    )}

}