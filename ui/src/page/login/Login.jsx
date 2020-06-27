import {Button, Form, Icon, Input, Layout, message, notification} from 'antd';
import React from "react";
import "./Login.css"
import {Authenticate} from "../../guard";
import {LocalStorageKey} from "../../config";

const {Content} = Layout;

class Login extends React.Component {
    componentDidMount() {
        let error = localStorage.getItem(LocalStorageKey.ERROR);

        if (error) {
            this.openNotificationError(error);
            localStorage.removeItem(LocalStorageKey.ERROR);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const messageType = message.loading('Authenticating...', 0);

                Authenticate().authenticate(values.username, values.password);

                setTimeout(messageType, 100);
                this.props.history.replace("/");

            }
        });
    };


    openNotificationError = (error) => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
                Confirm
            </Button>
        );

        if (error === "Permission") {
            notification.open({
                message: 'Please login!',
                description:
                    'You need to login to access private resource!',
                btn,
                key,
            });
        } else if (error === "Session") {
            notification.open({
                message: 'Your session is expired or Internet problem!',
                description:
                    'Your session is expired, please re-login or check our Internet connection!',
                btn,
                key,
            });
        } else {
            notification.open({
                message: 'Unknown Problem in Admin Tool. Automatically log out for safety!',
                description:
                    'Unknown problem is occurred. Please note what you did and send to Administrator.',
                btn,
                key,
            });
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Layout style={{minHeight: "100vh"}}>
                <div className="login-form-logo">
                    <img src={'/logo.png'} alt={"Logo"}/>
                </div>
                <Layout>
                    <Content style={{margin: "0 16px"}}>
                        <div>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <Form.Item>
                                    {getFieldDecorator('username', {
                                        rules: [{required: true, message: 'Please Input your username!'}],
                                    })(
                                        <Input
                                            maxLength={255}
                                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            placeholder="Username"
                                        />)}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Please Input your Password!'}],
                                    })(
                                        <Input
                                            maxLength={255}
                                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            type="password"
                                            placeholder="Password"
                                        />)}
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Form.create({name: 'normal_login'})(Login);
