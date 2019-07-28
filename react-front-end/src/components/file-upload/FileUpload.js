import {Upload, Button, Icon} from 'antd'
import axios from 'axios'
import React from 'react'

class MyUpload extends React.Component {
    state = {
        fileList: [],
    }

    handleChange = info => {
        let fileList = [info.fileList[0]]

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url
            }
            return file
        })

        this.setState({fileList})
    }

    render() {
        const props = {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange: this.handleChange,
            multiple: false,
        }
        return (
            <Upload {...props} fileList={this.state.fileList}>
                <Button>
                    <Icon type='upload' /> Upload
                </Button>
            </Upload>
        )
    }
}

export default MyUpload
