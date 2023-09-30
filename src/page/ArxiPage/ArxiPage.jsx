import React, { useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import './ArxiPage.scss'
import Product from '../../blog/Mblog/Product/Product'
import Building from '../../blog/Mblog/Building/Building'
import ArxiProduct from './_components/ArxiProduct/ArxiProduct'
import ArxiObjects from './_components/ArxiObjects/ArxiObjects'
import ArxiSmeta from './_components/ArxiSmeta/ArxiSmeta'
const ArxiPage = () => {
    const tabRef = useRef(1)
    const [tab, setTab] = useState(tabRef?.current)
    return (
        <div className='arxitektor'>
            <div className="blog_header">
                <Container fluid="xxl">
                    <div className="blog">
                        <div className="tab_list">
                            <ul>
                                <li onClick={() => setTab(1)} className={tab === 1 ? 'active' : "list_item"}>
                                    Объекты
                                </li>
                                <li onClick={() => setTab(2)} className={tab === 2 ? 'active' : "list_item"}>
                                    Продукты 
                                </li>
                                <li onClick={() => setTab(3)} className={tab === 3 ? 'active' : "list_item"}>
                                    История
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="tab_content">
                {
                    tab === 2 ? <ArxiProduct/> : tab === 1 ? <ArxiObjects/> : tab === 3 ? <ArxiSmeta/> : null
                }
            </div>
        </div>
    )
}

export default ArxiPage