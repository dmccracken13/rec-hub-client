import React, { useContext, useEffect } from "react"
import { ActivityContext } from "../activities/ActivityProvider"
import { Activity } from "./Activity"
import "./Activity.css"

export const ActivityList = () => {
    const { activities, getActivities } = useContext(ActivityContext)
    // const userId =  parseInt(localStorage.getItem("app_user_id"))
    // console.log(userId)
    useEffect(()=>{
        getActivities()
    }, [])

    return (
        <>
            <div className="column">
            <h1>Activities</h1>
                {/* <CategoryForm  /> */}
                <div className="column">
                    {activities
                    // .filter(c => c.userId === userId)
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