import React from 'react'
import { Outlet } from 'react-router-dom';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import LoginFooter from '../../components/LoginFooter/LoginFooter';
import './Login.scss'

const Login = () => {
    return (
        <div className='login'>
                <div className="login_page">
                    <LoginHeader />
                    <Outlet />
                </div>
                {/* <LoginFooter /> */}
        </div>
    )
}

export default Login