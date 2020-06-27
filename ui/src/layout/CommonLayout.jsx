import React from "react";
import {Layout} from "antd";
import "./common.css"
import {RouterConfig} from "../router";
import {Switch} from "react-router-dom";
import {HeaderNavigation, SideNavigation} from "../component";

const {Content, Footer, Sider} = Layout;

export default class CommonLayout extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout style={{minHeight: "100vh"}}>
                <Sider
                    collapsible collapsed={this.state.collapsed}
                    breakpoint="lg"
                    collapsedWidth="0"
                    trigger={null}
                    onCollapse={(collapsed, type) => {
                        this.setState({collapsed});
                    }}
                    theme={"dark"}
                    width={210}
                >
                    <div className="logo">
                        <img src={'/logo.png'} alt={"Logo"} width={180}/>
                    </div>
                    <SideNavigation/>
                </Sider>
                <Layout>
                    <HeaderNavigation onTriggerClick={this.toggle}
                    />
                    <Content style={{margin: "0 16px"}}>
                        <div style={{margin: "16px 0"}}>

                        </div>
                        <div style={{background: '#fff', padding: 24, minHeight: "80vh"}}>
                            <Switch>
                                <RouterConfig/>
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{textAlign: "center"}}>
                        Smart Real Estate - @TeacherWhoDon'tKnowCode
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

