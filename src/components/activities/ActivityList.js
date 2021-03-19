import React, { useContext, useEffect } from "react"
import { ActivityContext } from "../activities/ActivityProvider"
import { Activity } from "./Activity"
import "./Activity.css"

export const ActivityList = () => {
    const { activities, getActivities } = useContext(ActivityContext)
    
    useEffect(()=>{
        getActivities()
    }, [])

    return (
        <>
            <div className="column">
            <h1>Activities</h1>
                <div className="column">
                    {activities
                    .map(activity => {
                            return <Activity key={activity.id} 
                            activity={activity} 
                            />
                    })
                    }
                </div>
            </div>
        </>
    )
}