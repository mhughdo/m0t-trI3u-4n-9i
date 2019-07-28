import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Menu, Icon} from 'antd'
import {connect} from 'react-redux'
import {auth} from '../../firebase/firebaseUtils'

const {SubMenu} = Menu

class TopMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: null,
        }
    }

    render() {
        const {currentUser} = this.props
        return (
<<<<<<< HEAD
            <div style={{ display: 'flex' , justifyContent: 'space-between' }}>
                <Menu theme="dark"  mode="horizontal" style={{ lineHeight: '58px' }}>
                    <Menu.Item key="logo">
                        <Link to='/s'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style={{ width: 32, height: 32, marginBottom: -8, marginRight: 5 }}><g><circle fill="#FF4500" cx="10" cy="10" r="10"></circle><path fill="#FFF" d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"></path></g></svg>
                        <span style={{ color: 'white', fontSize: 'x-large' }}>rednit</span>
                        </Link>
=======
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Menu theme='dark' onClick={this.handleClick} mode='horizontal' style={{lineHeight: '58px'}}>
                    <Menu.Item key='logo'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            style={{width: 32, height: 32, marginBottom: -8, marginRight: 5}}>
                            <g>
                                <circle fill='#FF4500' cx='10' cy='10' r='10' />
                                <path
                                    fill='#FFF'
                                    d='M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z'
                                />
                            </g>
                        </svg>
                        <span style={{color: 'white', fontSize: 'x-large'}}>rednit</span>
>>>>>>> d8ee727ca9f75e67e6249b9d8f3a8776f3bff2af
                    </Menu.Item>
                    <Menu.Item key='home'>
                        <Link to='/'>
                            <Icon type='mail' />
                            Home
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='chat'>
                        <Link to='/chat'>
                            <Icon type='message' />
                            Chat
                        </Link>
                    </Menu.Item>
                    {/* <SubMenu
                    title={
                        <span className="submenu-title-wrapper">
                            <Icon type="setting" />
                            Navigation Three - Submenu
                        </span>
                    }
                >
                    <Menu.ItemGroup title="Item 1">
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title="Item 2">
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu> */}
                </Menu>
                <div style={{display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
                    {currentUser ? (
                        <div style={{color: '#1890ff', cursor: 'pointer'}} onClick={() => auth.signOut()}>
                            Đăng xuất
                        </div>
                    ) : (
                        <div>
                            <Link style={{marginRight: 20}} to='/login'>
                                Đăng nhập
                            </Link>
                            <Link to='/sign-up'>Đăng ký</Link>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(TopMenu)
