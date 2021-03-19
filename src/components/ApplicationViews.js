import React from "react"
import { Route, Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom"
import { ActivityProvider } from "./activities/ActivityProvider"
import { ActivityList } from "./activities/ActivityList"
import { ActivityForm } from "./activities/ActivityForm"
import { ContainerProvider } from "./containers/ContainerProvider"
import { ContainerList } from "./containers/ContainerList"
import { ContainerForm } from "./containers/ContainerForm"

export const ApplicationViews= (props) => (
    <>
        <div className="mainContainer">
                    <div className="header" id="myHeader">
                        <h2>RecHub</h2>
                    </div>
                        <ActivityProvider>
                            <ContainerProvider>
                                <div className="list-group">
                                <Route exact path="/" render={
                                props => 
                                    <>  
                                        <ActivityList {...props} className="list-group-item" />
                                        <ContainerList {...props} className="list-group-item" />
                                    </>
                                } />   
                                </div>
                            </ContainerProvider>
                        </ActivityProvider>

                        <ContainerProvider>
                        <div className="list-group">
                                <Route exact path="/containers/add" render={
                                props => 
                                    <>  
                                        <ContainerForm {...props} className="list-group-item" />
                                    </>
                                } />   
                                </div>
                        </ContainerProvider>

                        <ActivityProvider>
                        <div className="list-group">
                                <Route exact path="/activities/add" render={
                                props => 
                                    <>  
                                        <ActivityForm {...props} className="list-group-item" />
                                    </>
                                } />   
                                </div>
                        </ActivityProvider>
        </div>
    </>
)