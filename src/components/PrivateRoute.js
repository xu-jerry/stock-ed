/* Component for pages that require users to be logged in 
 * Based off of the PrivateRoute's example from https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
 */

import { Redirect, Route } from "react-router";

function PrivateRoute({component: Component, loggedIn, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (loggedIn) {
                    return <Component {...props} /> 
                } else {
                    return <Redirect to={{pathname: "/login", state: {from: props.location}}} />
                }
            }}
        />
    )
}

export default PrivateRoute;