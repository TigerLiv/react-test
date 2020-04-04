import React, { Component } from 'react';
import { Layout } from 'antd';
import SliderMenus from './../components/SliderMenus/index'
// import MainLayout from './../pages/container';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import First from './../pages/first';
import Second from './../pages/second';
const { Header, Footer, Sider, Content } = Layout;
type PropsType = RouteComponentProps & {};

export default class Home extends Component<PropsType, any> {


    componentDidMount() {
        // fetch('/api/list',{ 
        //     headers: { 'Content-Type': 'application/json;charset=UTF-8'}
        // }).then(res=>{
        //     // console.log(res.json())
        //     res.json().then(data=>{
        //         console.log(data)
        //     })
        // })
    }
    render() {
        return (
            <Layout>
                <Header className="header-content">React 项目实践</Header>
                <Layout className="main-content">
                    <Sider><SliderMenus></SliderMenus></Sider>
                    <Content>
                        <Switch>
                            <Route path="/test" component={First}></Route>
                            <Route path="/test1" component={Second}></Route>
                        </Switch>
                    </Content>
                </Layout>
                <Footer></Footer>
            </Layout>
        )
    }
}