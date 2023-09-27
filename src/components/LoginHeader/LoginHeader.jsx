import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import './LoginHeader.scss'
import brand_logo from "../../assets/image/sandiq_logo.svg";
import mainIllus from '../../assets/image/login_page.svg'
const LoginHeader = () => {
    return (
        <div className='login_header'>
            <Container>
                <div className="left_menu">
                    <div className="brand">
                        <img src={brand_logo} alt="logo" />
                    </div>
                    <div className="illustation">
                        <img src={mainIllus} alt="illustation" />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default LoginHeader