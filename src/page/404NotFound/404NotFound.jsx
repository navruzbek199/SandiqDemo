import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import "./404NotFound.scss";

import Logos from '../../assets/image/svg/404page.svg'
import Sloy from '../../assets/image/svg/illustration.svg'
const PageNotFound = () => {
  
   
  return (
    <div className='page_404'>
      <Container fluid="md">
      <div className="page_404__head">
        <NavLink to={"/home"}>
          <div className="nav__logo">
            <img src={Logos} alt="" />
          </div>
        </NavLink>
        <div className='contact'>
            <p>Astrolab</p>
            <a href="#">+998 71 120 00 00</a>
        </div>
      </div>
      <div className="page_404__body">
          <img src={Sloy} alt="" />
          <NavLink to={"/home"}>
              <h4>Назад</h4>
          </NavLink>
      </div>
      <div className="page_404__footer">
          <div className="foot_title">
              <p>Copyright © 2023 Astrolab</p>
          </div>
      </div>
      </Container>
    </div>
  )
}

export default PageNotFound