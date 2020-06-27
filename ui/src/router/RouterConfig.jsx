import React, {PureComponent} from "react";
import applicationRoutes from "./routes";
import {Route} from "react-router-dom";

export default class RouterConfig extends PureComponent {
    state = {
        routers: []
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let route = applicationRoutes();
        let flattenedCollection = [];

        this.bfs(route, flattenedCollection);
        this.setState({
            routes: this.renderRoute(flattenedCollection)
        });
    }

    render() {
        return (<div>{this.state.routes}</div>);
    }

    renderRoute = (flattenedCollection) => {
        return flattenedCollection.map((item) => {
                if (item.component !== null)
                    return (<Route
                        key={item.key}
                        path={item.key}
                        component={item.component}
                        exact={!!item.exact}
                    />);
                return "";
            }
        );
    };

    bfs = (tree, collection) => {
        return tree.forEach(item => {
            if (item.component) {
                let obj = {
                    key: item.key,
                    path: item.path,
                    component: item.component,
                    exact: !!item.exact
                };
                collection.push(obj);
            }
            if (item.children != null) {
                this.bfs(item.children, collection);
            }
        });
    };
};
