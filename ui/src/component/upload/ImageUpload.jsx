import React from "react";
import {Card, Col, Empty, Row} from "antd";
import SimpleUpload from "./SimpleUpload";
import PropTypes from "prop-types";


export default class SimpleImageUploadComponent extends React.Component {
    state = {
        isUseImageBox: false,
        fileExtensions: [],
        dimensions: [],
        maxFileSize: 2 * 1024 * 1024
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        let state = {};

        if (prevState.value !== nextProps.value) {
            state.value = nextProps.value
        }

        if (JSON.stringify(nextProps.fileExtensions) !== JSON.stringify(prevState.fileExtensions)) {
            state.fileExtensions = nextProps.fileExtensions;
        }

        if (JSON.stringify(nextProps.dimensions) !== JSON.stringify(prevState.dimensions)) {
            state.dimensions = nextProps.dimensions;
        }

        if (nextProps.maxFileSize !== prevState.maxFileSize) {
            state.maxFileSize = nextProps.maxFileSize;
        }

        return state;
    }

    static propTypes = {
        fileExtensions: PropTypes.array,
        dimensions: PropTypes.array,
        maxFileSize: PropTypes.number,
        accept: PropTypes.string,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        previewClassName: PropTypes.string,
        previewStyle: PropTypes.object
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {value, imageFile, imageBoxImageUrl} = this.state;

        if (!value && (imageFile || imageBoxImageUrl)) {
            this.setState({
                imageFile: null,
                imageBoxImageUrl: null
            });
        }

        if (value !== prevState.value) {
            if (value) {
                if (value instanceof File) {
                    this.setState({
                        imageFile: value,
                    })
                } else {
                    this.setState({
                        imageBoxImageUrl: value
                    })
                }
            }
        }
    }

    render() {
        const {imageFile, imageBoxImageUrl, dimensions, fileExtensions} = this.state;

        const {maxFileSize, accept, previewStyle, previewClassName} = this.props;

        const uploadCol = {
            xs: {span: 24},
            sm: {span: 24},
            md: {span: 24},
            lg: {span: 24},
        };
        return (
            <Row>
                <Col {...uploadCol}>
                    {
                        <Card style={{
                            height: 165
                        }}>
                            <RuleDescription
                                dimensions={dimensions}
                                maxFileSize={maxFileSize}
                            />
                            <br/>
                            <SimpleUpload
                                disabled={this.props.disabled}
                                dimensions={dimensions}
                                accept={accept}
                                maxFileSize={maxFileSize}
                                fileExtensions={fileExtensions}
                                onChange={this.onUploadImageChange}
                            />
                        </Card>
                    }

                    <Card>
                        {(imageFile || imageBoxImageUrl) ?
                            (<div className={"image-upload__gallery " + (previewClassName ? previewClassName : "")} style={previewStyle}>
                                <a target="_blank">
                                    <img alt={"Image Preview"}
                                         src={imageFile ? URL.createObjectURL(imageFile) : imageBoxImageUrl}
                                    />
                                </a>
                            </div>) :
                            (<Empty className={previewClassName ? previewClassName : ""}/>)
                        }
                    </Card>
                </Col>
            </Row>
        )
    };

    onUploadImageChange = (uploadFile) => {
        if (uploadFile && uploadFile.file) {
            this.setState({
                imageFile: uploadFile.file.originFileObj,
                imageBoxImageUrl: null,
            });

            if (this.props.onChange) {
                this.props.onChange(uploadFile.file.originFileObj);
            }
        } else {
            if (this.props.onChange) {
                this.props.onChange(null);
            }
        }
    };
}

class RuleDescription extends React.Component {
    state = {
        dimensions: [],
        maxFileSize: 2 * 1024 * 1024
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        let state = {};

        if (JSON.stringify(nextProps.dimensions) !== JSON.stringify(prevState.dimensions)) {
            state.dimensions = nextProps.dimensions;
        }

        if (nextProps.maxFileSize !== prevState.maxFileSize) {
            state.maxFileSize = nextProps.maxFileSize;
        }

        return state;
    }

    static propTypes = {
        dimensions: PropTypes.array,
        maxFileSize: PropTypes.number,
    };

    render() {
        const {dimensions, maxFileSize} = this.state;

        const dimensionBlock = (dimensions) => dimensions ? (
            <React.Fragment>
                <b>Dimension: </b><span>{dimensions.map(dimension => dimension.width + "x" + dimension.height).join(", ")}</span>
                <br/>
            </React.Fragment>) : "";


        const maxFileSizeBlock = (maxFileSize) => maxFileSize ? (
            <React.Fragment>
                <b>Max File Size: </b><span>{maxFileSize / 1024 / 1024 + "MB"}</span>
            </React.Fragment>) : "";

        return (
            <div className="image-upload-component__rule_description">
                {dimensionBlock(dimensions)}
                {maxFileSizeBlock(maxFileSize)}
            </div>
        )

    }

}