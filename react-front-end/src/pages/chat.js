import React, { Component } from 'react'
import { Col, Row, Tabs, Avatar } from 'antd'
import UserChatAvatar from '../components/user-chat/UserChatAvatar'
import MessageBox from '../components/user-chat/MessageBox';



const { TabPane } = Tabs;
class Chat extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="1" tabPosition='left' style={{ minHeight: '80vh', maxHeight: '90vh' }}>
                {[...Array(30).keys()].map(i => (
                    <TabPane tab={<UserChatAvatar />} key={i}>
                        <MessageBox></MessageBox>
                    </TabPane>
                ))}
            </Tabs>

        )
    }
}

export default Chat
