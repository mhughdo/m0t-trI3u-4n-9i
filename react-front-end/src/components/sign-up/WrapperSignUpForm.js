import React, {Component} from 'react'
import {Form, Icon, Input, Button, Checkbox, Row, Col, Select, message, Upload} from 'antd'
import axios from 'axios'
import {auth, createUserProfileDocument} from '../../firebase/firebaseUtils'
import createAPI from '../../utils/createAPI'
import UploadFile from '../file-upload/FileUpload'

const {Option} = Select

const normFile = e => {
    if (Array.isArray(e)) {
        return e
    }

    if (e.fileList.length > 1) {
        e.fileList.shift()
    }
    return e && e.fileList
}
const _fieldDecorator = {
    displayName: {
        rules: [{required: true, message: 'Please input your name!'}],
    },
    email: {
        rules: [{required: true, message: 'Please input your email!'}],
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
    sex: {
        initialValue: 'male',
        rules: [{required: true, message: 'Please choose your gender!'}],
    },
    job: {
        rules: [{required: true, message: 'Please choose your job!'}],
    },
    sports: {
        rules: [{required: true, message: 'Please choose your favourite sport!'}],
    },
    image: {
        initialValue: [],
        valuePropName: 'fileList',
        getValueFromEvent: normFile,
        rules: [{required: false, message: 'Please choose your favourite sport!'}],
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
                // console.log('Received values of form: ', values)
                // console.log('image', values.image)

                // console.log(la, lo)
                if (la && lo) {
                    // Todo call API
                    try {
                        const {email, password, displayName} = values
                        const allValues = {...values, longtitude: lo, latitude: la, name: displayName}
                        const api = createAPI('https://hughdo.dev/api/v1/users')
                        const {success, data, message: errMsg} = await api.makeRequest({
                            method: 'POST',
                            data: allValues,
                            url: '/create-profile',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                        if (!success) {
                            message.error(errMsg)
                        }
                        const {index} = data
                        // console.log(data)
                        // console.log(index)
                        let imageURL = ''
                        if (values.image.length) {
                            imageURL = await this.uploadFile(values.image[0].originFileObj, index)
                            delete allValues.image
                            console.log(imageURL)
                        }

                        const {user} = await auth.createUserWithEmailAndPassword(email, password)
                        // console.log(user)
                        await createUserProfileDocument(user, {...allValues, index, imageURL})
                        this.props.history.push('/')
                    } catch (error) {
                        message.error(error.message)
                    }
                } else {
                    message.error('Ban chưa cấp phép cho thông tin vị trí, Hãy thử lại')
                }
                this.setState({
                    signUpLoading: false,
                })
            }
        })
    }

    dummyRequest = ({file, onSuccess}) => {
        setTimeout(() => {
            onSuccess('ok')
        }, 0)
    }

    uploadFile = async (image, index) => {
        const {data: uploadConfig} = await axios.get(`https://hughdo.dev/api/v1/files/upload/${index}`)
        console.log(image)
        console.log(uploadConfig)
        const upload = await axios.put(uploadConfig.data.url, image, {
            headers: {
                'Content-Type': image.type,
            },
        })
        const prefix = 'https://mottrieuangi.s3-ap-southeast-1.amazonaws.com'
        return `${prefix}/${uploadConfig.data.key}`
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
        const {
            location: {lo, la},
        } = this.state
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{minWidth: '500px'}}>
                <Form.Item label='Tên'>
                    {getFieldDecorator('displayName', _fieldDecorator.displayName)(
                        <Input prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}} />} placeholder='Name' />
                    )}
                </Form.Item>
                <Form.Item label='Email'>
                    {getFieldDecorator('email', _fieldDecorator.email)(
                        <Input prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}} />} placeholder='Email' />
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
                    {lo ? (
                        <span>Đã lấy địa chỉ</span>
                    ) : (
                        <Button type='primary' onClick={this.handleGetLocation}>
                            Lấy địa chỉ
                        </Button>
                    )}
                </Form.Item>
                <Form.Item label='Giới tính'>
                    {getFieldDecorator('sex', _fieldDecorator.height)(
                        <Select
                            prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}} />}
                            placeholder='Giới tính'>
                            <Option value='Male'>Nam</Option>
                            <Option value='Female'>Nữ</Option>
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
                    {getFieldDecorator('sports', _fieldDecorator.height)(
                        <Select
                            prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}} />}
                            placeholder='Môn thể thao'>
                            <Option value='football'>Bóng đá</Option>
                            <Option value='basketball'>Bóng rổ</Option>
                            <Option value='volleyball'>Bóng chuyền</Option>
                            <Option value='swimming'>Bơi</Option>
                            <Option value='badminton'>Cầu lông</Option>
                            <Option value='table_tenis'>Bóng bàn</Option>
                            <Option value='tenis'>Tennis</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label='Ảnh đại diện'>
                    {getFieldDecorator('image', _fieldDecorator.image)(
                        <Upload customRequest={this.dummyRequest} name='file'>
                            <Button>
                                <Icon type='upload' accept='image/*' /> Upload
                            </Button>
                        </Upload>
                    )}
                </Form.Item>

                <Row>
                    <Col span={24}>
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
