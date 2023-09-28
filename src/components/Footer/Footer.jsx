import React from 'react'
import { Container } from 'react-bootstrap';
import './Footer.scss';
function Footer() {
  return (
    <div className='footer'>
      <Container fluid="xxl">
        <div className="footer_menu">
          <div className='left_text'>
            <p>Copyright © 2023 Astrolab</p>
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

export default Footer