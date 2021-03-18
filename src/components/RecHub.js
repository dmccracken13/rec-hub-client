import React from "react"
import { Route, Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom"
import { Login } from "./auth/Login"
import { Logout } from "./auth/Login"
import { Register } from "./auth/Register"
import { ActivityProvider } from "./activities/ActivityProvider"
import "./RecHub.css"

export const RecHub = (props) => (
    <>
        <div className="mainContainer">
                <Route render={() => {
             // The user id is saved under the key app_user_id in local Storage. Change below if needed!
            if (localStorage.getItem("app_user_id")) {
                return (
                    <>
                    <div className="header" id="myHeader">
                        <h2>RecHub</h2>
                        <Link className="logout" to="/login" onClick={()=>{Logout()}}>logout</Link>
                    </div>
                        <ActivityProvider>
                            
                        </ActivityProvider>

                </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
        </div>
    </>
)