import React, { Component } from 'react'
import { Layout } from 'antd';
import TopMenu from './TopMenu'
const { Header, Footer, Sider, Content } = Layout;

class PageView extends Component {
    componentDidMount() {
        window.x = () => {
            console.log(this.props)
        }
    }
    render() {
        return (
        
                <Layout >
                    <Header theme="light"> <TopMenu></TopMenu></Header>
                    <Content>    {this.props.children}</Content>
                    <Footer>Footer</Footer>
                </Layout>

        )
    }
}

export default PageView
