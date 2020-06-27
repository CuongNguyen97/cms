import React from "react";
import {TableConfig} from "../../../config";
import {GalleryService, ProjectService} from "../../../service";
import {Avatar, Button, Descriptions, Divider, Icon, message, PageHeader, Row, Table, Tooltip} from "antd";
import "./style.css";

export default class GalleryList extends React.Component {
    state = {
        data: null,
        project: {},
        meta: {
            page: 1,
            pageSize: TableConfig.INDEX_PAGE_SIZE_DEFAULT,
            pageSizeOptions: TableConfig.INDEX_PAGE_SIZE_OPTIONS,
            pageTotal: 1,
            total: 0,
        }
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

        this.galleryService = new GalleryService();
        this.projectService = new ProjectService();
    }

    componentDidMount() {
        document.title = "Gallery List";

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

        return (<div>
            <PageHeader title="Gallery List">
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
                    ><strong>&nbsp;&nbsp;New Gallery</strong></Button>
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
                style={{
                    width: "auto",
                }}
            />
        </div>)
    }

    getData = (projectId, param) => {
        this.galleryService.getGalleryListByProject(projectId, {
            offset: param.offset,
            size: param.size
        }).then(galleryList => {
            this.setState(prevState => ({
                ...prevState,
                data: galleryList.contents,
                meta: {
                    ...prevState.meta,
                    total: galleryList.total
                }
            }));
        });
    }

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: id => <Button type="link">{id}</Button>,
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
                        maxWidth: 500,
                        width: "auto",
                        height: "auto"
                    }}/>);
            }
        },
        {
            title: 'Register DateTime',
            key: 'dateTime',
            dataIndex: 'dateTime',
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
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
        }
    ]

    onRegisterClick = () => {
        this.props.history.push({
                pathname: '/content/project/' + this.state.project.id + '/gallery/modify',
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
                pathname: '/content/project/' + this.state.project.id + '/gallery/modify/' + record.id,
                state: {
                    id: record.id,
                }
            }
        );
    }

    onDeleteClick = (record) => {
        this.galleryService.deleteGalleryById(record.id)
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