import React from "react";
import {Redirect, Route} from "react-router-dom";

import authenticate from "./Authenticate";

export default class PrivateRoute extends React.Component {

    render() {
        const {children, ...rest} = this.props;
        return (
            <Route {...rest}
                   render={this.routeRender}
            />
        );
    }

    routeRender = (match, location, history) => {
        const {children} = this.props;
        if (authenticate().isAuthenticate()) {
            return children;
        } else {
            return (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {
                            from: location
                        }
                    }}
                />
            )
        }
    }
}
