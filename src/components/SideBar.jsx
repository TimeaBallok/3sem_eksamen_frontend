import React from 'react';
import {NavLink, Link} from "react-router-dom";
import facade from "../apiFacade.js";


function SideBar(props) {
    return (
        <div className="column side">
            {facade.hasUserAccess('user', props.loggedIn) ?
            <nav>
                <br/>
                <div>
                    <NavLink to= {props.loggedIn ? "/side1": "/login"}>US-1</NavLink>
                </div>
                <br/>
                <div>
                    <NavLink to={props.loggedIn ? "/side2" : "/login"} >US-2</NavLink>
                </div>
                <br/>
                <div>
                    <NavLink to={props.loggedIn ? "/side3" : "/login"} >US-3</NavLink>
                </div>
            </nav>  : <div style={{height: 50}}></div>}

            {facade.hasUserAccess('admin', props.loggedIn) ?
                <nav>
                    <br/>
                    <div>
                        <NavLink to={props.loggedIn ? "/side4" : "/login"} >US-4</NavLink>
                    </div>
                    <br/>
                    <div>
                        <NavLink to={props.loggedIn ? "/side5" : "/login"} >US-5</NavLink>
                    </div>
                    <br/>
                    <div>
                        <NavLink to={props.loggedIn ? "/side6" : "/login"} >US-6</NavLink>
                    </div>
                </nav>  : <div style={{height: 300}}></div>}
            <div style={{height: 200}}>

            </div>

            {/*<nav>*/}
            {/*    <div>*/}
            {/*        <a target="_blank" href="https://www.globalgoals.org/goals/3-good-health-and-well-being/">Extern link</a>*/}
            {/*    </div>*/}
            {/*</nav>*/}
        </div>
    );
}

export default SideBar;