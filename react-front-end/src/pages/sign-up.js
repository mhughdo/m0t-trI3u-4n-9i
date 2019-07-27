import React, {Component} from 'react'
import {Row, Col} from 'antd'
import WrapperSignUpForm from '../components/sign-up/WrapperSignUpForm';

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div>
                    <Row>
                        <Col>
                            <div style={{fontWeight: 'bold', fontSize: 'x-large'}}>Đăng ký</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <WrapperSignUpForm />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default SignUp
