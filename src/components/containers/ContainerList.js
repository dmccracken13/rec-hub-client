import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { ContainerContext } from "../containers/ContainerProvider"
import { Container } from "./Container"
import "./Container.css"

export const ContainerList = (props) => {
    const { containers, getContainers } = useContext(ContainerContext)
    
    useEffect(()=>{
        getContainers()
    }, [])

    return (
        <>
            <div className="column">
            <h1>Containers</h1>
            <button className="btn btn-secondary" onClick={() => {
                    props.history.push(`/containers/add`)
                }}>New Container
                </button>
                <div className="column">
                    {containers
                    .map(container => {
                            return <Link key={container.id} to={`/containers/${container.id}`}>
                                        <h3>{container.name}</h3>
                                    </Link>
                    })
                    }
                </div>
            </div>
        </>
    )
}