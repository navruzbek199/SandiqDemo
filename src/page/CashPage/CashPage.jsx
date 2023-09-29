import React, { useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import './CashPage.scss'
const CashPage = () => {
    const tabRef = useRef(1)
    const [tab, setTab] = useState(tabRef?.current)
    return (
        <div className='cash_page'>
            <div className="blog_header">
                <Container fluid="xxl">
                    <div className="blog">
                        <div className="tab_list">
                            <ul>
                                <li onClick={() => setTab(1)} className={tab === 1 ? 'active' : "list_item"}>
                                    Касса
                                </li>
                                <li onClick={() => setTab(2)} className={tab === 2 ? 'active' : "list_item"}>
                                    Входящие
                                </li>
                                <li onClick={() => setTab(3)} className={tab === 3 ? 'active' : "list_item"}>
                                    Исходящий
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="tab_content">
                
            </div>
        </div>
    )
}

export default CashPage