import React, { Component } from 'react';
import { Menu } from 'antd';
import { withRouter,RouteComponentProps } from 'react-router-dom';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
type PropsType = RouteComponentProps & {};

class SliderMenus extends Component<PropsType, any>  {
    handleClick = (e: any) => {
        console.log('click ', e);
        if(e.key === '2'){
            this.props.history.push('test1')
        }
        if(e.key === '1'){
            this.props.history.push('test')
        }
    };

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                style={{ width: 200 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <AppstoreOutlined />
                            <span>JavaScript</span>
                        </span>
                    }
                >
                    <Menu.ItemGroup key="g1" title="基础">
                        <Menu.Item key="1">Option 1</Menu.Item>
                        <Menu.Item key="2">Option 2</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup key="g2" title="进阶">
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <AppstoreOutlined />
                            <span>Navigation Two</span>
                        </span>
                    }
                >
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu
                    key="sub4"
                    title={
                        <span>
                            <SettingOutlined />
                            <span>Navigation Three</span>
                        </span>
                    }
                >
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}
export default withRouter(SliderMenus)