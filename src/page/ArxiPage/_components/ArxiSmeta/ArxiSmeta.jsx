import React from 'react'
import { Container } from 'react-bootstrap'
import Add from '../../../../assets/image/svg/add.svg';
const ArxiSmeta = () => {
    return (
        <div className='arxi_smeta'>
            <Container fluid='xxl'>
                <div className="teacher_menu">
                    <div className="blog__add">
                        <button className='add__btn add_teacher'>
                            <img src={Add} alt="icon_add" />
                            Добавить смета 
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ArxiSmeta