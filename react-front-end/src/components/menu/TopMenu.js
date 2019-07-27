import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class TopMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: null
        }
    }

    render() {
        return (
            <Menu theme="dark" onClick={this.handleClick} mode="horizontal" style={{ lineHeight: '64px' }}>
                <Menu.Item key="home">
                    <Link to="/"><Icon type="mail" />Home</Link>
                </Menu.Item>
                <Menu.Item key="chat">
                    <Link to="/chat"><Icon type="message" />Chat</Link>
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
        )
    }
}

export default TopMenu
