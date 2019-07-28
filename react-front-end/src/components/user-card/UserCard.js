import React, { Component } from 'react';
import { Card } from 'antd';
const { Meta } = Card;

class UserCard extends Component {
    render() {
        const {name, image, job} = this.props;
        console.log(this.props)
        return (
            <div>
                <Card style={{ width: 375 }}
                    cover={<img draggable="false"
                     style={{ maxWidth: 375, maxHeight: 567, objectFit: 'cover' }} 
                     alt="example" src={image}/>}>
                    <Meta style={{userSelect: 'none'}} title={name} description="job"/>
                </Card>
            </div>
        )
    }
}

export default UserCard