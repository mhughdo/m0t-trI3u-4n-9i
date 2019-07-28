import React, { Component } from 'react';
import { Avatar , Tag } from 'antd'

class UserChatAvatar extends Component {
    render() {
        return (
            <div>
                <Avatar style={{marginRight: 10}}>U</Avatar>
                <Tag>name</Tag>
            </div>

        )
    }
}

export default UserChatAvatar