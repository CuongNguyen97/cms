import React from "react";
import {ProjectService, RoomService} from "../../../service";
import {Button, Col, Descriptions, Form, Icon, Input, message, PageHeader, Row, Tooltip} from "antd";
import {ImageUpload} from "../../../component";

class RoomModify extends React.Component {
    state = {
        projectId: null,
        roomId: null,
        blockSubmit: false,
        project: {}
    };

    constructor(props) {
        super(props);

        this.projectService = new ProjectService();
        this.roomService = new RoomService();
    }

    componentDidMount() {
        document.title = "Room Modify";

        let roomId;
        let projectId;

        if (this.props.location.state && this.props.location.state.id) {
            roomId = this.props.location.state.id;
        } else if (this.props.match.params && this.props.match.params.id) {
            roomId = this.props.match.params.id;
        }

        if (roomId) {
            this.setState({roomId: roomId});

            let roomPromise = this.roomService.getRoomById(roomId);

            roomPromise.then(room => {
                if (room) {
                    this.projectService.getProjectById(room.projectId)
                        .then(project => this.setState({project}));

                    this.setFormData(room);
                }
            });
        } else {
            if (this.props.match.params && this.props.match.params.projectId) {
                projectId = this.props.match.params.projectId;
                this.setState({projectId})

                this.projectService.getProjectById(projectId)
                    .then(project => this.setState({project}));
            }
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 24},
                md: {span: 24},
                lg: {span: 4},
                xl: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 24},
                md: {span: 24},
                lg: {span: 18},
                xl: {span: 14},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 4,
                },
            },
        };
        const saveButtonCol = {
            xs: {span: 4},
            sm: {span: 4},
            md: {span: 12},
            lg: {span: 12},
        };

        const cancelButtonCol = {
            xs: {span: 12},
            sm: {span: 12},
            md: {span: 12},
            lg: {span: 12},
        };
        return (
            <div>
                <PageHeader
                    title={this.state.roomId != null ? "Room Modifier" : "Room Register"}
                >
                    <Descriptions title="Project Information" bordered column={3}>
                        <Descriptions.Item label="ID" span={1}>{this.state.project.id}</Descriptions.Item>
                        <Descriptions.Item label="Subject" span={2}>{this.state.project.subject}</Descriptions.Item>
                        <Descriptions.Item label="Properties" span={3} className="multiline">{this.state.project.properties}</Descriptions.Item>
                    </Descriptions>
                </PageHeader>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label={
                        <span>Subject&nbsp;<Tooltip title="Nhập đại đi ngại ngùng gì"><Icon type="question-circle-o"/></Tooltip></span>
                    }>
                        {getFieldDecorator('subject', {
                            rules: [{required: true, message: 'Please Input Subject!'}],
                        })(<Input
                            placeholder="Enter subject of project"
                            maxLength={255}
                        />)}

                    </Form.Item>

                    <Form.Item label={
                        <span>Length (cm)&nbsp;<Tooltip title="Chiều dài theo cm"><Icon type="question-circle-o"/></Tooltip></span>
                    }>
                        {getFieldDecorator('length', {
                            rules: [{required: true, message: 'Please Input length!'}],
                        })(<Input
                            style={{
                                maxWidth: 400
                            }}
                            placeholder="Enter length of room in cm"
                            maxLength={6}
                        />)}

                    </Form.Item>

                    <Form.Item label={
                        <span>Width (cm)&nbsp;<Tooltip title="Chiều rộng theo cm"><Icon type="question-circle-o"/></Tooltip></span>
                    }>
                        {getFieldDecorator('width', {
                            rules: [{required: true, message: 'Please Input Width!'}],
                        })(<Input
                            style={{
                                maxWidth: 400
                            }}
                            placeholder="Enter width of room in cm"
                            maxLength={6}
                        />)}

                    </Form.Item>

                    <Form.Item {...formItemLayout} label="Image">
                        {getFieldDecorator('image', {
                            rules: [{required: true, message: 'Choose a image!'}],
                        })(
                            <ImageUpload
                                accept=".png, .jpg"
                                fileExtensions={[
                                    "jpg", "png"
                                ]}
                                dimensions={[
                                    {
                                        width: 889,
                                        height: 500
                                    }
                                ]}
                                maxFileSize={2 * 1024 * 1024}/>
                        )}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Row>
                            <Col {...cancelButtonCol} style={{textAlign: 'left'}}>
                                <Button type="default" onClick={this.onCancelClick}>
                                    Cancel
                                </Button>
                            </Col>

                            <Col {...saveButtonCol} style={{textAlign: 'right'}}>
                                <Button type="primary" icon="save" htmlType="submit" onClick={this.onSaveClick}>
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </div>
        )
    }

    onCancelClick = () => {
        const {project} = this.state;

        this.props.history.push({
                pathname: '/content/project/' + project.id + "/room",
            }
        );
    }

    onSaveClick = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (this.state.blockSubmit) {
                    return;
                } else {
                    this.setState({
                        blockSubmit: true
                    });
                }

                const messageType = message.loading('Processing, please wait...', 0);
                let room = this.prepareFormData(values);

                let savePromise;

                if (this.state.roomId != null) {
                    room.set("id", this.state.roomId);

                    savePromise = this.roomService.updateRoom(room);
                    savePromise.then(data => {
                        if (data) {
                            let isUpdate = true;
                            this.setState({isUpdate});
                        }
                    });
                } else {
                    savePromise = this.roomService.insertRoom(room);
                    savePromise.then(data => {
                        if (data) {
                            let isUpdate = false;
                            this.setState({isUpdate});
                        }
                    });
                }

                savePromise.then(data => {
                    setTimeout(messageType, 100);
                    if (data) {
                        this.setState({projectId: data.id, blockSubmit: false});
                        message.success(this.state.isUpdate ? "Update successfully" : "Insert successfully");
                        this.setFormData(data);
                    }
                });

                savePromise.then(() => {
                    let blockSubmit = false;
                    this.setState({blockSubmit});

                });
            }
        });
    }

    prepareFormData = (values) => {
        let formData = new FormData();
        Object.keys(values).forEach(fieldName => {
            if (values[fieldName]) {
                formData.set(fieldName, values[fieldName]);
            }
        });

        formData.set("projectId", this.state.project.id);

        if (!(values.image instanceof File)) {
            formData.set("imageUrl", values.thumbnail);

            formData.delete("image");
        }

        return formData;
    }

    setFormData = (data) => {
        this.props.form.setFields({
            subject: {
                value: data.subject,
                errors: null
            },
            length: {
                value: data.length,
                errors: null
            },
            width: {
                value: data.width,
                errors: null
            },
            image: {
                value: data.imageUrl,
                errors: null
            },
        });
    };
}

export default RoomModify = Form.create({name: 'register'})(RoomModify);