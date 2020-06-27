import React, {Component} from "react";
import {Button, Col, Form, Icon, Input, message, PageHeader, Row, Select, Tooltip} from "antd";
import {ImageUpload} from "../../../component";
import {ValidatorUtils} from "../../../util";
import {GeoService, ProjectService} from "../../../service";

const {TextArea} = Input
const {Option} = Select;
class ProjectModify extends Component {

    state = {
        provinces: [],
        districts: [],
        wards: [],
        projectId: null,
        blockSubmit: false,
    };

    constructor(props) {
        super(props);

        this.projectService = new ProjectService();
        this.geoService = new GeoService();
    }

    componentDidMount() {
        document.title = "Project Modify";

        let projectId;

        if (this.props.location.state && this.props.location.state.id) {
            projectId = this.props.location.state.id;
        } else if (this.props.match.params && this.props.match.params.id) {
            projectId = this.props.match.params.id;
        }

        if (projectId) {
            this.setState({projectId: projectId});

            let projectPromise = this.projectService.getProjectById(projectId);
            projectPromise.then(project => this.setFormData(project));
        }

        this.geoService.getAllProvince()
            .then(provinces => {
                this.setState({
                    provinces
                });
                const hcmc = provinces.find(province => province.text === "Hồ Chí Minh");
                this.geoService.getAllDistrictByProvinceId(hcmc.id)
                    .then(districts => {
                        this.setState({
                            districts
                        })
                    });
            })

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
                    title={this.state.projectId != null ? "Project Modifier" : "Project Register"}
                />
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

                    <Form.Item label={<span>Price&nbsp;(VND)</span>}>
                        {getFieldDecorator('price', {
                            rules: [{required: true, validator: ValidatorUtils.checkPriceInput,}],
                        })(<Input
                            maxLength={15}
                            placeholder="Enter price"
                            style={{maxWidth: 320}}
                            disabled={this.state.id}
                        />)}
                    </Form.Item>

                    <Form.Item label="Properties">
                        {getFieldDecorator('properties', {
                            rules: [{required: true, message: 'Please enter properties!'}],
                        })(
                            <TextArea
                                placeholder="Project Properties"
                                autoSize={{minRows: 4, maxRows: 6}}
                                maxLength={500}
                            />,
                        )}
                    </Form.Item>

                    <Form.Item label="Description">
                        {getFieldDecorator('longDescription', {
                            rules: [{required: true, message: 'Please enter long description!'}],
                        })(
                            <TextArea
                                placeholder="More details"
                                autoSize={{minRows: 8, maxRows: 10}}
                                maxLength={1000}
                            />,
                        )}
                    </Form.Item>


                    <Form.Item {...formItemLayout} label="Thumbnail">
                        {getFieldDecorator('thumbnail', {
                            rules: [{required: true, message: 'Choose a thumbnail!'}],
                        })(
                            <ImageUpload
                                accept=".png, .jpg"
                                fileExtensions={[
                                    "jpg", "png"
                                ]}
                                dimensions={[
                                    {
                                        width: 500,
                                        height: 500
                                    }
                                ]}
                                maxFileSize={2 * 1024 * 1024}/>
                        )}
                    </Form.Item>

                    <Form.Item label="Location">
                        <Form.Item label="Province" style={{
                            maxWidth: 500
                        }}>
                            {getFieldDecorator('province', {
                                initialValue: "Hồ Chí Minh",
                                rules: [{required: true, message: 'Select province!'}],
                            })(
                                <Select
                                    onSelect={this.onProvinceSelect}
                                >
                                    {this.state.provinces.map(province => (
                                        <Option key={"province" + province.id} title={province.text} value={province.text}>{province.text}</Option>))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="District" style={{
                            maxWidth: 500
                        }}>
                            {getFieldDecorator('district', {
                                rules: [{required: true, message: 'Select district!'}],
                            })(
                                <Select
                                    disabled={this.state.districts.length === 0}
                                    onSelect={this.onDistrictSelect}
                                >
                                    {this.state.districts.map(district => (
                                        <Option key={"district" + district.id} title={district.text} value={district.text}>{district.text}</Option>))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Ward" style={{
                            maxWidth: 500
                        }}>
                            {getFieldDecorator('ward', {
                                rules: [{required: true, message: 'Select ward!'}],
                            })(
                                <Select
                                    disabled={this.state.wards.length === 0}
                                    onSelect={this.onWardSelect}
                                >
                                    {this.state.wards.map(ward => (
                                        <Option key={"ward" + ward.id} title={ward.text} value={ward.text}>{ward.text}</Option>))}
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item label="Street" style={{
                            maxWidth: 700
                        }}>
                            {getFieldDecorator('street', {
                                rules: [{required: true, message: 'Input Address!'}],
                            })(
                                <TextArea
                                    disabled={this.state.wards.length === 0}
                                    placeholder="Input street and address"
                                    maxLength={255}
                                    autoSize={{minRows: 3, maxRows: 5}}
                                />
                            )}
                        </Form.Item>
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
        this.props.history.push({
                pathname: '/content/project',
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
                let project = this.prepareFormData(values);

                let savePromise;

                if (this.state.projectId != null) {
                    project.set("id", this.state.projectId);

                    savePromise = this.projectService.updateProject(project);
                    savePromise.then(data => {
                        if (data) {
                            let isUpdate = true;
                            this.setState({isUpdate});
                        }
                    });
                } else {
                    savePromise = this.projectService.insertProject(project);
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

    onProvinceSelect = (value) => {
        let province = this.state.provinces.find(province => province.text === value);
        this.geoService.getAllDistrictByProvinceId(province.id)
            .then(districts => {
                this.setState({
                    districts
                })
            })
    }
    onDistrictSelect = (value) => {
        let district = this.state.districts.find(district => district.text === value);
        this.geoService.getAllWardsByDistrictId(district.id)
            .then(wards => {
                this.setState({
                    wards
                })
            })
    }


    setFormData = (data) => {
        this.props.form.setFields({
            subject: {
                value: data.subject,
                errors: null
            },
            price: {
                value: data.price,
                errors: null,
            },
            properties: {
                value: data.properties,
                errors: null
            },
            longDescription: {
                value: data.longDescription,
                errors: null
            },
            thumbnail: {
                value: data.thumbnailUrl,
                errors: null
            },
            street: {
                value: data.street,
                errors: null
            },
            ward: {
                value: data.ward,
                errors: null
            },
            district: {
                value: data.district,
                errors: null
            },
            province: {
                value: data.province,
                errors: null
            }
        });

        this.geoService.getAllProvince()
            .then(provinces => {
                this.setState({
                    provinces
                });
                let province = provinces.find(province => province.text === data.province);
                this.geoService.getAllDistrictByProvinceId(province.id)
                    .then(districts => {
                        this.setState({
                            districts
                        });

                        let district = districts.find(district => district.text === data.district);
                        this.geoService.getAllWardsByDistrictId(district.id)
                            .then(wards => {
                                this.setState({
                                    wards
                                })
                            })
                    })
            })
    };

    prepareFormData = (values) => {
        let formData = new FormData();
        Object.keys(values).forEach(fieldName => {
            if (values[fieldName]) {
                formData.set(fieldName, values[fieldName]);
            }
        });

        if (!(values.thumbnail instanceof File)) {
            formData.set("thumbnailUrl", values.thumbnail);

            formData.delete("thumbnail");
        }

        return formData;
    }
}

export default ProjectModify = Form.create({name: 'register'})(ProjectModify);