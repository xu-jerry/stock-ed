/* Component for pages that require users to be logged in 
 * Based off of the PrivateRoute's example from https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
 * Return page only if user is logged in and pass the loginUser method to lift the state up
 */

import {Route } from "react-router";
import Login from "./../Login/Login";

function PrivateRoute({component: Component, loginUser, loggedIn, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (loggedIn) {
                    return <Component {...props} /> 
                } else {
                    return <Login origin = {props} setLoginStatus = {() => loginUser()}/>
                }
            }}
        />
    )
}

export default PrivateRoute;