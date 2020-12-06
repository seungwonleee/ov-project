import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { ExportOutlined, UploadOutlined } from '@ant-design/icons';

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
        localStorage.removeItem('userId');
      } else {
        alert('로그아웃 실패')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      // 로그인 안된경우
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <Link to="/login">로그인</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">회원가입</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      // 로그인 된경우
      <Menu mode={props.mode}>
        <Menu.Item key="videoUpload">
          <Link to='/video/upload'>작품 공유하기 <UploadOutlined /></Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>로그아웃 <ExportOutlined /></a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

