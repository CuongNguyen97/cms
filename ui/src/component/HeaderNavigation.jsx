import React from "react";
import {Button, Icon, Layout, Menu} from "antd";
import {Authenticate} from "../guard"
import {LocalStorageKey} from "../config";

export default class HeaderNavigation extends React.Component {
    state = {
        collapsed: false
    };

    renderLogout = () => {
        return (
            <Menu.Item
                style={{
                    float: 'right', display: 'flex',
                    justifyContent: "space-around",
                    alignItems: 'center', width: "auto"
                }}
                title={"Logout"}
                onClick={this.handleLogout}
            >
                <strong> {localStorage.getItem(LocalStorageKey.LOGGED_USER)}</strong>&nbsp;&nbsp;
                <Button type="link"
                        icon="logout">
                    Logout
                </Button>
            </Menu.Item>
        )
    };

    handleLogout() {
        Authenticate().logOut("CLICK");
    }

    render() {
        return (
            <Layout.Header
                style={{
                    background: '#fff',
                    padding: '0'
                }}
            >
                <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <Menu
                    theme="light"
                    mode="horizontal"
                    style={{lineHeight: '64px', padding: '0', float: "right"}}
                >

                    {this.renderLogout()}
                </Menu>
            </Layout.Header>
        )
    }

    toggle = () => {
        this.setState({collapsed: !this.state.collapsed});

        this.props.onTriggerClick();
    }
}
