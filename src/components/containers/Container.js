import React, { useContext } from "react"
import { ContainerContext } from "./ContainerProvider"
import { useHistory } from "react-router-dom";

// component responsible for rendering a single container

export const Container = ({ container, props }) => {
    const { removeContainer } = useContext(ContainerContext)
    const history = useHistory()
    return(
        <section className="container">
            <div className="container__name">{container.name}</div>
            <button className="btn btn-secondary" onClick={() => {
                    history.push(`/containers/${container.id}`)
                }}>Details
            </button> 
            <button className="btn btn-secondary" onClick={() => {
                    history.push(`/containers/edit/${container.id}`)
                }}>Edit
            </button>
            <button type="button"className="btn btn-danger" id={container.id}
                            onClick={
                                () => {
                                removeContainer(+container.id)  
                                                .then(() => {
                                                history.push("/")
                                                })
                                }
                            }>
                            Delete
            </button>
        </section>
    )
}