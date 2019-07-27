import React, { Component } from 'react';
import { Card } from 'antd';
const { Meta } = Card;

class UserCard extends Component {
    render() {

        return (
            <div>
                <Card style={{ width: 375 }}
                    cover={<img draggable="false" style={{ maxWidth: 375, maxHeight: 567, objectFit: 'cover' }} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta style={{userSelect: 'none'}} title="Nguyên" description="Học sinh" />
                </Card>
            </div>
        )
    }
}

export default UserCard