import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import './LoginHeader.scss'
import brand_logo from "../../assets/image/Vector.svg";
const LoginHeader = () => {
    return (
        <div className='login_header'>
            <Container fluid="md">
                <div className="login_page__head">
                    <div className="head_lang">
                        {/* {languages?.map(({code, name})=>(
                            <a 
                            key={code} 
                            onClick={()=> {i18next.changeLanguage(code)}} 
                            style={{
                                opacity: currentLanguageCode !== code ? 0.5 : 1,
                            }}
                            className={{disabled: currentLanguageCode === code}}
                            >
                                {name}
                            </a>
                        ))
                        } */}
                    </div>
                </div>
                <div className="login_page__menu">
                    <div className="login_page__menu__title">
                        <img src={brand_logo} alt="brand" />
                        <p>
                            Складская CRM-система, которая помогает компаниям оптимизировать свои складские операции и сократить расходы.
                        </p>
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default LoginHeader