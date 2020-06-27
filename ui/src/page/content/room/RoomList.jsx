import React from "react";
import {TableConfig} from "../../../config";
import {ProjectService, RoomService} from "../../../service";
import {Avatar, Button, Descriptions, Divider, Icon, message, PageHeader, Row, Table, Tooltip} from "antd";
import {cutString, formatAmount} from "../../../util";

export default class RoomList extends React.Component {
    state = {
        data: null,
        meta: {
            page: 1,
            pageSize: TableConfig.INDEX_PAGE_SIZE_DEFAULT,
            pageSizeOptions: TableConfig.INDEX_PAGE_SIZE_OPTIONS,
            pageTotal: 1,
            total: 0,
        },
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
        document.title = "Room List";

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

        this.getData(projectId, this.param);
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
                        onClick={this.onProjectClick}
                        type="default"
                        size="default"
                        icon="left"
                    ><strong>&nbsp;&nbsp;Project</strong></Button>
                    <Button
                        style={{
                            float: "right",
                            margin: 15,
                        }}
                        onClick={this.onRegisterClick}
                        type="primary"
                        size="default"
                        icon="plus"
                    ><strong>&nbsp;&nbsp;New Room</strong></Button>
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
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            render: subject => cutString(subject, 40)

        },
        {
            title: "Image",
            dataIndex: "imageUrl",
            key: "imageUrl",
            align: "center",
            render: imageUrl => {
                return (<Avatar
                    shape="square"
                    alt="Gallery"
                    src={imageUrl}
                    style={{
                        maxWidth: 200,
                        width: "auto",
                        height: "auto"
                    }}/>);
            }
        },
        {
            title: 'Length (cm)',
            key: 'length',
            dataIndex: 'length',
        },
        {
            title: 'Width (cm)',
            key: 'width',
            dataIndex: 'width',
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
                        <Tooltip title="Edit Details">
                            <Button type="default" onClick={() => this.onEditClick(record)}><Icon type="edit" theme="twoTone" twoToneColor="#096dd9"/></Button>
                        </Tooltip>
                        <Divider type="vertical"/>
                        <Tooltip title="Delete">
                            <Button type="danger" onClick={() => this.onDeleteClick(record)}><Icon type="delete"/></Button>
                        </Tooltip>
                    </React.Fragment>),
        },
    ]

    getData = (projectId, param) => {
        this.roomService.getRoomListByProject(projectId, {
            offset: param.offset,
            size: param.size
        }).then(roomList => {
            this.setState(prevState => ({
                ...prevState,
                data: roomList.contents,
                meta: {
                    ...prevState.meta,
                    total: roomList.total
                }
            }));
        });
    }

    onRegisterClick = () => {
        this.props.history.push({
                pathname: '/content/project/' + this.state.project.id + '/room/modify',
            }
        );
    };

    onProjectClick = () => {
        this.props.history.push({
                pathname: '/content/project/',
            }
        );
    }

    onEditClick = (record) => {
        this.props.history.push({
                pathname: '/content/project/' + this.state.project.id + '/room/modify/' + record.id,
                state: {
                    id: record.id,
                }
            }
        );
    }

    onDeleteClick = (record) => {
        this.roomService.deleteRoomById(record.id)
            .then(result => {
                if (result) {
                    message.success("Delete successfully");
                } else {
                    message.error("Delete failed!");
                }
                this.getData(this.state.project.id, this.param);
            })
    }

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