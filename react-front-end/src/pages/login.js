import React, { Component } from 'react'
import WrappedNormalLoginForm from "../components/login/WrappedNormalLoginForm";
import { Row, Col } from 'antd';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <div>
                    <Row>
                        <Col span='24' >
                            <div style={{ fontWeight: 'bold', fontSize: 'x-large' }}>
                                Đăng nhập
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span='24'>
                            <WrappedNormalLoginForm></WrappedNormalLoginForm>
                        </Col>
                    </Row>
                </div>
            </ div>
        );
    }
}



export default Login

