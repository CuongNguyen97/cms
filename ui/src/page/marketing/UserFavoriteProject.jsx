import React from "react";
import {TableConfig} from "../../config";
import {ProjectService, RoomService} from "../../service";
import {Avatar, Button, Descriptions, Divider, Icon, message, Modal, PageHeader, Row, Table, Tooltip} from "antd";
import {cutString} from "../../util";

export default class UserFavoriteProject extends React.Component {
    state = {
        data: null,
        meta: {
            page: 1,
            pageSize: TableConfig.INDEX_PAGE_SIZE_DEFAULT,
            pageSizeOptions: TableConfig.INDEX_PAGE_SIZE_OPTIONS,
            pageTotal: 1,
            total: 0,
        },
        user: {},
        project: {}
    };

    param = {
        offset: 0,
        size: TableConfig.INDEX_PAGE_SIZE_DEFAULT,
        subject: ""
    };

    paginationOptions = {
        showSizeChanger: true,
        showQuickJumper: false,
        locale: {items_per_page: ''}
    };

    constructor(props) {
        super(props);

        this.projectService = new ProjectService();
        this.roomService = new RoomService();
    }

    componentDidMount() {
        document.title = "User Favorite Project";

        let projectId;

        if (this.props.location.state && this.props.location.state.id) {
            projectId = this.props.location.state.id;
        } else if (this.props.match.params && this.props.match.params.id) {
            projectId = this.props.match.params.id;
        }

        if (projectId) {
            this.setState({projectId: projectId});
            const projectPromise = this.projectService.getProjectById(projectId);
            projectPromise.then(project => this.setState({
                project
            }));

            this.getData(projectId, this.param);
        }
    }

    render() {
        const pagination = {
            ...this.paginationOptions,
            total: this.state.meta.total,
            current: this.state.meta.page,
            pageSize: this.state.meta.pageSize,
            pageSizeOptions: this.state.meta.pageSizeOptions,
            onChange: this.onPaginationChange,
            onShowSizeChange: this.onPaginationChange,
        };

        const {user} = this.state;

        return (<div>
            <PageHeader title="Room List">
                <Descriptions title="Project Information" bordered column={3}>
                    <Descriptions.Item label="ID" span={1}>{this.state.project.id}</Descriptions.Item>
                    <Descriptions.Item label="Subject" span={2}>{this.state.project.subject}</Descriptions.Item>
                    <Descriptions.Item label="Properties" span={3} className="multiline">{this.state.project.properties}</Descriptions.Item>
                </Descriptions>
                <Row>
                    <Button
                        style={{
                            float: "left",
                            margin: 15,
                        }}
                        onClick={this.onFavoriteClick}
                        type="default"
                        size="default"
                        icon="left"
                    ><strong>&nbsp;&nbsp;Favorite</strong></Button>
                </Row>
            </PageHeader>
            <Table
                columns={this.columns}
                dataSource={this.state.data}
                pagination={pagination}
                rowKey="id"
                bordered
                size='small'
                scroll={{
                    x: 'auto',
                }}
            />
            <Modal
                title="User Information"
                visible={this.state.visible}
                onOk={this.handleOk}
                footer={[
                    <Button type="default" onClick={this.handleOk}>
                        Close
                    </Button>,
                ]}
            >
                <Descriptions column={3}>
                    <Descriptions.Item label="Username" span={3}>{user.username}</Descriptions.Item>
                    <Descriptions.Item label="Full Name" span={3}>{user.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email" span={3}>{user.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone" span={3}>{user.phone}</Descriptions.Item>
                </Descriptions>
            </Modal>
        </div>)
    }

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: text => <Button type="link">{text}</Button>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: username => cutString(username, 40)

        },
        {
            title: "Full Name",
            dataIndex: "fullName",
            key: "username",
            align: "center",
        },
        {
            title: 'email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            key: 'phone',
            dataIndex: 'phone',
        },
        {
            title: 'Register DateTime',
            key: 'dateTime',
            dataIndex: 'dateTime'
        },
        {
            title: 'Action',
            key: 'action',
            width: 200,
            render:
                (record) => (
                    <React.Fragment>
                        <Tooltip title="User Details">
                            <Button type="default" onClick={() => this.onUserDetailClick(record)}><Icon type="info-circle" theme="twoTone" twoToneColor="#096dd9"/></Button>
                        </Tooltip>
                    </React.Fragment>),
        },
    ]

    getData = (projectId, param) => {
        this.projectService.getUserFavoriteByProject(projectId, {
            offset: param.offset,
            size: param.size
        }).then(userFavoriteProjectList => {
            this.setState(prevState => ({
                ...prevState,
                data: userFavoriteProjectList.contents,
                meta: {
                    ...prevState.meta,
                    total: userFavoriteProjectList.total
                }
            }));
        });
    }


    onFavoriteClick = () => {
        this.props.history.push({
                pathname: '/marketing/favorite/',
            }
        );
    }

    onUserDetailClick = (record) => {
        this.setState({
            user: record,
            visible: true
        })
    }

    handleOk = () =>  this.setState({visible: false, user: {}})

    onPaginationChange = (page, pageSize) => {
        this.param.offset = (page - 1) * pageSize;
        this.param.size = pageSize;

        this.setState(prevState => ({
            ...prevState,
            meta: {
                ...prevState.meta,
                page: page,
                pageSize: pageSize,
            }
        }));

        this.getData(this.state.projectId, this.param);
    };
}