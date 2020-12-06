import React from 'react';
import { Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="movie">
        <Link to='/'>Movie</Link>
      </Menu.Item>
      <Menu.Item key="TVProgram">
        <Link to='/'>TV 프로그램</Link>
      </Menu.Item>
      <Menu.Item key="person">
        <Link to='/'>인물</Link>
      </Menu.Item>
      <Menu.Item key="videoShare">
        <Link to='/video/share'>개인작품</Link>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu