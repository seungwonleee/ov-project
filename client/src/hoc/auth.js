import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            //인증요청보내기
            dispatch(auth()).then(response => {
                //로그인 아닌 상태
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                    //로그인된 상태
                } else {
                    //관리자 페이지 접근시 관리자가 아닌경우 메인페이지로 이동
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    //로그인된 상태에서 로그인페이지 접근시 메인페이지로 이동
                    else {
                        if (option === false) {
                            props.history.push('/')
                        }
                    }
                }
            })

        }, [])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}


