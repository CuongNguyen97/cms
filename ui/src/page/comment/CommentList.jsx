import React, {Component} from "react";
import {TableConfig} from "../../config";
import {Button, Divider, Form, Icon, Input, message, PageHeader, Row, Table, Tooltip} from 'antd';
import {cutString} from "../../util";
import {CommentService} from "../../service";

const {Search} = Input;
export default class CommentList extends Component {
    state = {
        data: null,
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
        content: ""
    };

    paginationOptions = {
        showSizeChanger: true,
        showQuickJumper: false,
        locale: {items_per_page: ''}
    };

    constructor(props) {
        super(props);

        this.commentService = new CommentService();
    }

    componentDidMount() {
        this.getData(this.param);
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
            <PageHeader title="Comment List">
                <Form.Item label="Content">
                    <Search
                        placeholder="input content keyword"
                        enterButton="Search"
                        size="default"
                        style={{width: 500, display: 'inline-block'}}
                        onSearch={this.onSearch}
                    />
                </Form.Item>
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

    getData = (param) => {
        this.commentService.getCommentList(param).then(commentList => {
            this.setState(prevState => ({
                ...prevState,
                data: commentList.contents,
                meta: {
                    ...prevState.meta,
                    total: commentList.total
                }
            }));
        });
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
        },
        {
            title: 'Project',
            dataIndex: 'projectSubject',
            key: 'projectSubject',
        },
        {
            title: 'Content',
            key: 'content',
            dataIndex: 'content',
            render: content => cutString(content, 40)
        },
        {
            title: 'DateTime',
            key: 'dateTime',
            dataIndex: 'dateTime'
        },
        {
            title: 'Action',
            key: 'action',
            width: 200,
            render: (record) => (
                <React.Fragment>
                    <Tooltip title="Details">
                        <Button type="default" onClick={() => this.onDetailClick(record)}><Icon type="more"/></Button>
                    </Tooltip>
                    <Divider type="vertical"/>
                    <Tooltip title="Delete">
                        <Button type="danger" onClick={() => this.onDeleteClick(record)}><Icon type="delete"/></Button>
                    </Tooltip>
                </React.Fragment>),
        },
    ]


    onDetailClick = (record) => {
        this.props.history.push({
                pathname: '/content/project/modify/' + record.id,
                state: {
                    id: record.id,
                }
            }
        );
    };

    onDeleteClick = (record) => {
        this.commentService.deleteComment(record.id)
            .then(result => {
                if (result) {
                    message.success("Delete Successful!");
                } else {
                    message.error("Delete Failed!")
                }
                this.getData(this.param);
            });
    };

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

        this.getData(this.param);
    };

    onSearch = (content) => {
        this.setState({meta: {page: 1}});

        this.param.offset = 0;
        this.param.content = content;
        this.getData(this.param);
    }
};