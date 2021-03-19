import React, { useContext, useEffect } from "react"
import { ContainerContext } from "../containers/ContainerProvider"
import { Container } from "./Container"
import "./Container.css"

export const ContainerList = () => {
    const { containers, getContainers } = useContext(ContainerContext)
    
    useEffect(()=>{
        getContainers()
    }, [])

    return (
        <>
            <div className="column">
            <h1>Containers</h1>
                <div className="column">
                    {containers
                    .map(container => {
                            return <Container key={container.id} 
                            container={container} 
                            />
                    })
                    }
                </div>
            </div>
        </>
    )
}