import {Menu} from "antd";
import React from "react";
import renderMenu from "./renderMenu"
import {withRouter} from 'react-router-dom';
import routeData from "../router/routes";
import "./SideNavigation.css";

class SideNavigation extends React.Component {
    rootSubmenuKeys = [];
    state = {
        collapsed: false,
        openKeys: [],
        selectedKeys: [],
        menuData: [],
    };

    componentDidMount() {
        this.setNavigationState();
        const pathInCaseModify = (this.props.location.pathname + "").replace(/\/modify.+/i, "");

        this.setState({
            menuData: renderMenu(),
            selectedKeys: [pathInCaseModify]
        })
        // renderMenu().then(data => {
        //     this.setState({
        //         menuData: data,
        //         selectedKeys: [pathInCaseModify]
        //     });
        // });
    }

    render() {
        this.getInitOpenKeys();
        return (
            <Menu
                theme={"dark"}
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                onSelect={this.menuOnSelect}
                selectedKeys={this.state.selectedKeys}
            >
                {this.state.menuData}
            </Menu>
        );
    }

    getInitOpenKeys = () => {
        if (this.state.openKeys == null || (this.rootSubmenuKeys != null && this.rootSubmenuKeys.length > 0 && this.state.openKeys.length <= 0)) {
            if (this.rootSubmenuKeys != null && this.props.location.pathname != null && this.props.location.pathname !== "/") {
                let openKeys = [];
                routeData().filter(sub => sub.children != null).forEach(sub => {
                    if (sub.children.filter(child => child.key !== '' && this.props.location.pathname.match(new RegExp("^" + child.key + ".*"))).length) {
                        openKeys.push(sub.key);
                    }
                });

                if (openKeys.length > 0) {
                    this.setState({
                        openKeys: openKeys,
                    })
                }
            }
        }
    };

    setNavigationState = () => {
        const itemSidebars = routeData();
        itemSidebars.forEach((item) => {
            if (item.children != null) {
                this.rootSubmenuKeys.push(item.key);
            }
        });

        const pathInCaseModify = (this.props.location.pathname + "").replace(/\/modify.+/i, "");


        this.setState({
            openKeys: this.rootSubmenuKeys.filter(sub => this.props.location.pathname.match(new RegExp("^" + sub + ".*"))),
            selectedKeys: [pathInCaseModify]
        })

    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({
                openKeys: openKeys,
            });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    menuOnSelect = (itemSelected) => {
        this.setState({
            selectedKeys: [itemSelected.key]
        })
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

}

export default withRouter(SideNavigation);
