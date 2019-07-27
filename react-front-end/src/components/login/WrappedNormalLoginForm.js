import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Form, Icon, Input, Button, Checkbox, Row, Col, Select} from 'antd'

const _fieldDecorator = {
    username: {
        rules: [{required: true, message: 'Please input your username!'}],
    },
    password: {
        rules: [{required: true, message: 'Please input your Password!'}],
    },
    remember: {
        valuePropName: 'checked',
        initialValue: true,
    },
}

class NormalLoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Form onSubmit={this.handleSubmit} style={{minWidth: '400px'}}>
                <Form.Item>
                    {getFieldDecorator('username', _fieldDecorator.username)(
                        <Input
                            prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}} />}
                            placeholder='Username'
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', _fieldDecorator.password)(
                        <Input
                            prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}} />}
                            type='password'
                            placeholder='Password'
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    {/*
                    <Row>
                        <Col >
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {getFieldDecorator('remember', _fieldDecorator.remember)(<Checkbox>Remember me</Checkbox>)}
                                <a className="login-form-forgot" href="">
                                    Forgot password
                                </a>
                            </div>
                        </Col>
                    </Row> */}

                    <Row>
                        <Col>
                            <Button type='primary' htmlType='submit' style={{width: '100%'}}>
                                Đăng nhập
                            </Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Link to='/sign-up'>
                                <Button type='dashed' style={{width: '100%'}}>
                                    Đăng ký
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        )
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(NormalLoginForm)
export default WrappedNormalLoginForm
