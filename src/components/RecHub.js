import React from "react"
import { Route, Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom"
import { Login } from "./auth/Login"
import { Logout } from "./auth/Login"
import { Register } from "./auth/Register"
import { ActivityProvider } from "./activities/ActivityProvider"
import { ActivityList } from "./activities/ActivityList"
import { ContainerProvider } from "./containers/ContainerProvider"
import { ContainerList } from "./containers/ContainerList"
import "./RecHub.css"

export const RecHub = (props) => (
    <>
        <div className="mainContainer">
                <Route render={() => {
             // The user id is saved under the key app_user_id in local Storage. Change below if needed!
            if (localStorage.getItem("rh_token")) {
                return (
                    <>
                    <div className="header" id="myHeader">
                        <h2>RecHub</h2>
                        <Link className="logout" to="/login" onClick={()=>{Logout()}}>logout</Link>
                    </div>
                        <ActivityProvider>
                            <ContainerProvider>
                                <div className="list-group">
                                <Route exact path="/" render={
                                props => 
                                    <>  
                                        <ActivityList className="list-group-item" />
                                        <ContainerList className="list-group-item" />
                                    </>
                                } />   
                                </div>
                            </ContainerProvider>
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