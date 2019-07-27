import React, {Component} from 'react'
import {Form, Icon, Input, Button, Checkbox, Row, Col, Select, message} from 'antd'
import {auth, createUserProfileDocument} from '../../firebase/firebaseUtils'

const {Option} = Select
const _fieldDecorator = {
    name: {
        rules: [{required: true, message: 'Please input your name!'}],
    },
    username: {
        rules: [{required: true, message: 'Please input your username!'}],
    },
    password: {
        rules: [{required: true, message: 'Please input your Password!'}],
    },
    age: {
        initialValue: '<20',
        rules: [{required: true, message: 'Please input your age!'}],
    },
    height: {
        rules: [
            {required: true, message: 'Please input your Height!'},
            // { type: 'number', message: 'Chiều cao phải là số!' }
        ],
    },
    location: {
        initialValue: 1,
        rules: [{required: true, message: 'Please choose your location!'}],
    },
    gender: {
        initialValue: 'male',
        rules: [{required: true, message: 'Please choose your gender!'}],
    },
    job: {
        rules: [{required: true, message: 'Please choose your job!'}],
    },
    sport: {
        rules: [{required: true, message: 'Please choose your favourite sport!'}],
    },
}

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
}

class SignUpForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signUpLoading: false,
            location: {},
        }
    }

    handleSubmit = e => {
        const {lo, la} = this.state.location
        e.preventDefault()
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                this.setState({
                    signUpLoading: true,
                })
                console.log('Received values of form: ', values)
                const {username, password} = values
                const {user} = await auth.createUserWithEmailAndPassword(username, password)
                console.log(user)
                // console.log(la, lo)
                if (la && lo) {
                    // Todo call API

                    const allValues = {...values, lo, la}
                } else {
                    message.error('Ban chưa cấp phép cho thông tin vị trí, Hãy thử lại')
                }
            }
        })
    }

    handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    location: {
                        la: position.coords.latitude,
                        lo: position.coords.longitude,
                    },
                })
            })
        } else {
            console.log('Geolocation is not supported by this browser.')
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{minWidth: '500px'}}>
                <Form.Item label='Tên'>
                    {getFieldDecorator('name', _fieldDecorator.name)(
                        <Input prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}} />} placeholder='Name' />
                    )}
                </Form.Item>
                <Form.Item label='Tên đăng nhập'>
                    {getFieldDecorator('username', _fieldDecorator.username)(
                        <Input
                            prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}} />}
                            placeholder='Username'
                        />
                    )}
                </Form.Item>
                <Form.Item label='Mật khẩu'>
                    {getFieldDecorator('password', _fieldDecorator.password)(
                        <Input
                            prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}} />}
                            type='password'
                            placeholder='Password'
                        />
                    )}
                </Form.Item>
                <Form.Item label='Tuổi'>
                    {getFieldDecorator('age', _fieldDecorator.age)(
                        <Select
                            prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}} />}
                            type='password'
                            placeholder=' Tuổi '>
                            <Option value='<20'>{'<20'}</Option>
                            <Option value='20-25'>20-25</Option>
                            <Option value='25-30'>25-30</Option>
                            <Option value='>30'>{'>30'}</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label='Chiều cao'>
                    {getFieldDecorator('height', _fieldDecorator.height)(<Input placeholder='Chiều cao' />)}
                </Form.Item>
                <Form.Item label='Địa chỉ'>
                    <Button type='primary' onClick={this.handleGetLocation}>
                        Lấy địa chỉ
                    </Button>
                </Form.Item>
                <Form.Item label='Giới tính'>
                    {getFieldDecorator('gender', _fieldDecorator.height)(
                        <Select
                            prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}} />}
                            placeholder='Giới tính'>
                            <Option value='male'>Nam</Option>
                            <Option value='female'>Nữ</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label='Nghề nghiệp'>
                    {getFieldDecorator('job', _fieldDecorator.height)(
                        <Select
                            prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}} />}
                            placeholder='Nghề nghiệp'>
                            <Option value='student'>Học sinh</Option>
                            <Option value='teacher'>Giáo viên</Option>
                            <Option value='engineer'>Kỹ sư</Option>
                            <Option value='doctor'>Bác sĩ</Option>
                            <Option value='accounting'>Kế toán</Option>
                            <Option value='developer'>Lập trình viên</Option>
                            <Option value='seller'>Nhân viên bán hàng</Option>
                            <Option value='other'>Khác</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label='Môn thể thao'>
                    {getFieldDecorator('sport', _fieldDecorator.height)(
                        <Select
                            prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}} />}
                            placeholder='Môn thể thao'>
                            <Option value='football'>Bóng đá</Option>
                            <Option value='>basketball'>Bóng rổ</Option>
                            <Option value='>volleyball'>Bóng chuyền</Option>
                            <Option value='>swimming'>Bơi</Option>
                            <Option value='>badminton'>Cầu lông</Option>
                            <Option value='>table_tenis'>Bóng bàn</Option>
                            <Option value='>tenis'>Tennis</Option>
                        </Select>
                    )}
                </Form.Item>

                <Row>
                    <Col>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button
                                type='primary'
                                htmlType='submit'
                                style={{width: '68%'}}
                                loading={this.state.signUpLoading}>
                                Đăng ký
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        )
    }
}
const WrapperSignUpForm = Form.create({name: 'sign_up'})(SignUpForm)

export default WrapperSignUpForm
