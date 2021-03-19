import React from "react"
import { Link } from "react-router-dom"
import { Logout } from "../auth/Login"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <div className="navbar">
            <div className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </div>
            <div className="navbar__item">
                <Link className="navbar__link" to="/trips">Trips</Link>
            </div>
            <div className="navbar__item">
                <Link className="navbar__link" to="/friends">Friends</Link>
            </div>
            <div className="navbar__item">
            <Link className="logout" to="/login" onClick={()=>{Logout()}}>logout</Link>
            </div>
        </div>
    )
}