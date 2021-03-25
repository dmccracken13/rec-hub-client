import React, { useContext, useEffect } from "react"
import ReactDOM from 'react-dom';
import ReactScrollbar from 'react-scrollbar-js';
import { ActivityContext } from "../activities/ActivityProvider"
import { Activity } from "./Activity"
import "./Activity.css"

export const ActivityList = (props) => {
    const { activities, getActivities } = useContext(ActivityContext)
    
    useEffect(()=>{
        getActivities()
    }, [])

    class ScrollableComponent extends React.Component {

        render() {
            const myScrollbar = {
                width: 400,
                height: 400,
            };

    return (
        <>
            <ReactScrollbar style={myScrollbar}>
                <div className="should-have-a-children scroll-me">
                    <div className="column">
                    <h1 className="h1">Activities</h1>
                    <button className="btn btn-success" onClick={() => {
                            props.history.push(`/activities/add`)
                        }}>New Activity
                    </button>
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
                </div>
            </ReactScrollbar>
        </>
    )}}
}