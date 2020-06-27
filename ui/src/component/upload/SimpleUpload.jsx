import React from "react";
import {Button, Icon, message, Upload} from "antd";
import PropTypes from 'prop-types';
import "./style.css";

export default class SimpleUpload extends React.Component {

    state = {
        fileExtensions: [],
        dimensions: [],
        maxFileSize: 2 * 1024 * 1024
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const state = {};

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

    constructor(props) {
        super(props);
    }

    static propTypes = {
        fileExtensions: PropTypes.array,
        dimensions: PropTypes.array,
        maxFileSize: PropTypes.number,
        accept: PropTypes.string,
        onChange: PropTypes.func,
    };

    render() {
        const {uploadedFile} = this.state;

        return (
            <Upload
                customRequest={this.noRequest}
                beforeUpload={this.beforeUpload}
                showUploadList={false}
                {...this.props}
                onChange={this.onChange}
            >
                <Button
                    disabled={this.props.disabled}
                ><Icon type={"upload"}/> Upload</Button>
                <br/>
                <i className="image-upload-component__file_name">{uploadedFile ? this.getFileNameShort(uploadedFile.file, 20) : ""}</i>
            </Upload>
        );
    }

    onChange = (uploadedFile) => {
        if (uploadedFile.file.status === "done") {
            this.setState({uploadedFile});

            if (this.props.onChange) {
                this.props.onChange(uploadedFile);
            }
        }
    };

    beforeUpload = (file) => {
        const {fileExtensions, dimensions, maxFileSize} = this.state;

        return new Promise((resolve, reject) => {
            let extension = file.name.split('.').pop();

            if (fileExtensions && fileExtensions.length > 0 && fileExtensions.filter(fileExtension => fileExtension === extension).length <= 0) {
                message.error('You can only upload ' + fileExtensions.join(", ") +  ' file!');

                reject(file);
            }

            if (file.size > maxFileSize) {
                message.error('You can only upload image with size <= ' + maxFileSize);

                reject(file);
            }

            this.checkImageDimensions(file, dimensions).then(isDimOk => {
                if (isDimOk) {
                    resolve(file);
                } else {
                    let dimensionString = dimensions.map(dimension => dimension.width + "x" + dimension.height).join(" ");
                    message.error("You need to upload image with dimension: " + dimensionString);

                    reject(file);
                }
            });
        });
    };


    checkImageDimensions = (file, dimensions) => {
        return new Promise(resolve => {
            const image = new Image();

            image.src = window.URL.createObjectURL(file);

            image.onload = () => {
                const width = image.naturalWidth;
                const height = image.naturalHeight;

                window.URL.revokeObjectURL(image.src);

                if (dimensions && dimensions.length > 0 && dimensions.filter(dimension => dimension.width === width && dimension.height === height).length <= 0) {
                    resolve(false);
                } else {
                    resolve(true)
                }
            };
        });
    };

    noRequest = ({onSuccess}) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    getFileNameShort = (file, length) => {
        if (file && file.name) {

            if (file.name.length > length) {
                return file.name.substr(0, length) + "...";
            } else {
                return file.name;
            }
        }


    }
}