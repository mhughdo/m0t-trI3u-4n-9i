import React, { Component } from 'react';
import { Card } from 'antd';
const { Meta } = Card;


const genderMap = {
    'Male': 'Nam',
    'Female': 'Nữ'
}

const jobMap = {
    'student': 'Học sinh',
    'teacher': 'Giáo viên',
    'engineer': 'Kỹ sư',
    'doctor': 'Bác sĩ',
    'accounting': 'Kế toán',
    'developer': 'Lập trình viên',
    'seller': 'Nhân viên bán hàng',
    'other': 'Khác',
}

const sportMap = {
    'football': 'Bóng đá',
    'basketball': 'Bóng rổ',
    'volleyball': 'Bóng chuyền',
    'swimming': 'Bơi',
    'badminton': 'Cầu lông',
    'table_tenis': 'Bóng bàn',
    'tenis': 'Tennis',
}

class UserCard extends Component {

    componentDidMount() {
        const { profile, imageURL } = this.props;
        const name = profile && profile.Name || ''
        const gender = profile && profile.Sex || ''

        window.y = () => {
            console.log(this.props)
        }
    }

    renderImg = () => {
        const { imageURL } = this.props.userData;
        return (
            <img draggable="false"
                style={{ maxWidth: 375, maxHeight: 567, objectFit: 'cover' }}
                alt="example" src={imageURL} />
        )
    }

    render() {
        const { profile } = this.props.userData;
        const name = profile && profile.Name || ''
        const gender = profile && profile.Sex || ''
        const job = profile && profile.Job || ''
        const sport = profile && profile.Sports || ''
        console.log('Card', this.props)
        return (
            <div>
                <Card style={{ width: 375 }}
                    cover={this.renderImg()}>
                    <Meta style={{ userSelect: 'none' }} title={name} />
                    <p>Giới tính: {genderMap[gender]}</p>
                    <p>Nghề nghiệp: {jobMap[job]}</p>
                    <p>Môn thể thao ưu thích: {sportMap[sport]}</p>
                </Card>
            </div>
        )
    }
}

export default UserCard