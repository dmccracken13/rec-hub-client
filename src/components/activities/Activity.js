import React from "react"

// component responsible for rendering a single activity

export const Activity = ({ activity }) => (
    <section className="activity">
        <div className="activity__name">{activity.name}</div>
    </section>
)