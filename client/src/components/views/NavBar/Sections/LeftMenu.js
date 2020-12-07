import React from 'react';
import { Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="movie">
        <Link to='/'>인기 해외 Movie</Link>
      </Menu.Item>
      <Menu.Item key="videoShare">
        <Link to='/video/share'>개인 작품</Link>
      </Menu.Item>
      <Menu.Item key="subscription">
        <Link to='/subscription'>구독 목록</Link>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu