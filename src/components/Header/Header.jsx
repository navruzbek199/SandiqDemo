import React, { useEffect, useState } from 'react'
import './Header.scss';
import { Container } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logos from '../../assets/image/sandiq_logo.svg';
import Account from '../Account/Account';
import Notification from '../Notification/Notification';
const SuperAdminHeader = () => {
    return (
        <div className='super_head'>
              <Container fluid="md">
                <div className="super_head__menu">
                    <nav>
                        <div className='nav__left'>
                            <NavLink to={"/home"}>
                                {/* <div className="nav__logo">
                                    <img src={Logos} alt="" />
                                </div> */}
                            </NavLink>
                            {/* <ul className='nav__section'>
                                <NavLink to="/superadmin/" className="title">
                                    {t('school')}
                                </NavLink>
                                <NavLink to="/superadmin/journals"  className="title">
                                    {t('journal')}
                                </NavLink>
                            </ul> */}
                        </div>
                        <div className='nav__items gap-3'>
                            <Notification/>
                            <Account/>
                        </div>
                    </nav>
                </div>
            </Container>
        </div>
        
    )
}

export default SuperAdminHeader