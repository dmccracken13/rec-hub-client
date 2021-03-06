import React, { useContext } from "react"
import { ActivityContext } from "./ActivityProvider"
import { useHistory } from "react-router-dom";

// component responsible for rendering a single activity

export const Activity = ({ activity }) => {
    const { removeActivity } = useContext(ActivityContext)
    const history = useHistory()
    return(    
        <>    
            <section className="card d-flex justify-content-center" style={{ width: '8rem', height: '4rem'}}>
                <div className="activity__name">{activity.name}</div>
            </section>
            <button className="btn btn-warning" onClick={() => {
                    history.push(`/activities/edit/${activity.id}`)
                }}>Edit
            </button>
            <button type="button"className="btn btn-danger" id={activity.id}
            onClick={
                () => {
                removeActivity(+activity.id)  
                                .then(() => {
                                history.push("/")
                                })
                }
            }>
            Delete
            </button>
        </>
    )
}