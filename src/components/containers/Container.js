import React from "react"

// component responsible for rendering a single container

export const Container = ({ container }) => (
    <section className="container">
        <div className="container__name">{container.name}</div>
    </section>
)