import React, {Component} from "react";
import {TableConfig} from "../../config";
import {Avatar, Button, Form, Icon, Input, PageHeader, Table, Tooltip} from 'antd';
import {cutString, formatAmount} from "../../util";
import {ProjectService} from "../../service";

const {Search} = Input;
export default class Favorite extends Component {
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
        subject: ""
    };

    paginationOptions = {
        showSizeChanger: true,
        showQuickJumper: false,
        locale: {items_per_page: ''}
    };

    constructor(props) {
        super(props);

        this.prjectService = new ProjectService();
    }

    componentDidMount() {
        document.title = "Project List";

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
            <PageHeader title="Favorite">
                <Form.Item label="Subject">
                    <Search
                        placeholder="input subject keyword"
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
        this.prjectService.getProjectFavoriteList(param).then(favoriteProjectList => {
            this.setState(prevState => ({
                ...prevState,
                data: favoriteProjectList.contents,
                meta: {
                    ...prevState.meta,
                    total: favoriteProjectList.total
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
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            render: subject => cutString(subject, 40)

        },
        {
            title: "Image",
            dataIndex: "thumbnailUrl",
            key: "thumbnailUrl",
            align: "center",
            render: thumbnailUrl => {
                return (<Avatar
                    shape="square"
                    alt="Gallery"
                    src={thumbnailUrl}
                    style={{
                        maxWidth: 50,
                        width: "auto",
                        height: "auto"
                    }}/>);
            }
        },
        {
            title: 'Price',
            key: 'price',
            dataIndex: 'price',
            render: price => formatAmount(price)
        },
        {
            title: 'Favorite Count',
            key: 'favoriteCount',
            dataIndex: 'favoriteCount',
            render: favoriteCount => formatAmount(favoriteCount)
        },
        {
            title: 'Register DateTime',
            key: 'dateTime',
            dataIndex: 'dateTime'
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (record) => (
                <React.Fragment>
                    <Tooltip title="User Favorite List">
                        <Button type="default" onClick={() => this.onUserListClick(record)}><Icon type="team"/></Button>
                    </Tooltip>
                </React.Fragment>),
        },
    ]

    onUserListClick = (record) => {
        this.props.history.push({
                pathname: '/marketing/favorite/project/' + record.id,
                state: {
                    id: record.id,
                }
            }
        );
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

    onSearch = (subject) => {
        this.setState({meta: {page: 1}});

        this.param.offset = 0;
        this.param.subject = subject;
        this.getData(this.param);
    }
};