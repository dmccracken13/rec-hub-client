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
import { ContainerDetails } from "./containers/ContainerDetails"
import { ItemProvider } from "./items/ItemProvider"
import { ItemList } from "./items/ItemList"
import { ItemForm } from "./items/ItemForm"
import { StatusProvider } from "./statuses/StatusProvider"
import { TypeProvider } from "./types/TypeProvider"


export const ApplicationViews= (props) => (
    <>
        <div className="mainContainer">
                    <div className="header" id="myHeader">
                        <h2>RecHub</h2>
                    </div>
                        <ActivityProvider>
                            <ContainerProvider>
                                <ItemProvider>
                                    <div className="list-group">
                                    <Route exact path="/" render={
                                    props => 
                                        <>  
                                            <ActivityList {...props} className="list-group-item" />
                                            <ItemList {...props} className="list-group-item" />
                                            <ContainerList {...props} className="list-group-item" />
                                        </>
                                    } />   
                                    </div>
                                </ItemProvider>
                            </ContainerProvider>
                        </ActivityProvider>

                        <ContainerProvider>
                            <ItemProvider>
                                <ActivityProvider>
                                    <StatusProvider>
                                        <TypeProvider>    
                                            <div className="list-group">
                                                    <Route exact path="/containers/add" render={
                                                    props => 
                                                        <>  
                                                            <ContainerForm {...props} className="list-group-item" />
                                                        </>
                                                    } /> 
                                                    <Route exact path="/containers/edit/:containerId(\d+)" render={
                                                    props => <ContainerForm {...props} />
                                                    } /> 
                                                    <Route exact path="/containers/:containerId(\d+)" render={
                                                    props => 
                                                        <>  
                                                            <ContainerDetails {...props} className="list-group-item" />
                                                        </>
                                                    } />
                                                    <Route exact path="/activities/add" render={
                                                    props => 
                                                        <>  
                                                            <ActivityForm {...props} className="list-group-item" />
                                                        </>
                                                    } />
                                                    <Route exact path="/activities/edit/:activityId(\d+)" render={
                                                    props => <ActivityForm {...props} />
                                                    } /> 
                                                    <Route exact path="/items/add" render={
                                                    props => 
                                                        <>  
                                                            <ItemForm {...props} className="list-group-item" />
                                                        </>
                                                    } />         
                                            </div>
                                        </TypeProvider>
                                    </StatusProvider>
                                </ActivityProvider>
                            </ItemProvider>    
                        </ContainerProvider>

                        
                            
                        
        </div>
    </>
)