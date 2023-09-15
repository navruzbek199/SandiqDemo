import React from 'react'
import { Container } from 'react-bootstrap';
import './LoginFooter.scss';
const LoginFooter = () => {
    return (
        <div className='login_footer'>
            <Container fluid="md">
                <div className="login_page__footer">
                    <div className='left_text'>
                        <p>Copyright © 2023 ASTROLAB</p>
                        <p>Пользовательское соглашение</p>
                    </div>
                    <div className="right_text">
                        <p>Служба поддержки</p>
                        <a href="tel">+998 71 120 00 00</a>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default LoginFooter