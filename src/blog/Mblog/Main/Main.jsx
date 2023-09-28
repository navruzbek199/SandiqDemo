import React, { useRef, useState } from 'react'
import './Main..scss'
import { Container } from 'react-bootstrap'
import Worker from '../Worker/Worker'
import Shed from '../Shed/Shed'
import System from '../System/System'
import Product from '../Product/Product'
import Building from '../Building/Building'
const Main = () => {
    const tabRef = useRef(1)
    const [tab, setTab] = useState(tabRef?.current)
    const [open, setOpen] = useState(false)
    return (
        <div className='main'>
            <div className="blog_header">
                <Container fluid="xxl">
                    <div className="blog">
                        <div className="tab_list">
                            <ul>
                                <li onClick={() => setTab(1)} className={tab === 1 ? 'active' : "list_item"}>
                                    Сотрудники
                                </li>
                                <li onClick={() => setTab(2)} className={tab === 2 ? 'active' : "list_item"}>
                                    Склады
                                </li>
                                <li onClick={() => setTab(5)} className={tab === 5 ? 'active' : "list_item"}>
                                    Объекты
                                </li>
                                <li onClick={() => setTab(3)} className={tab === 3 ? 'active' : "list_item"}>
                                    Продукты
                                </li>
                                <li onClick={() => setTab(4)} className={tab === 4 ? 'active' : "list_item"}>
                                    Мониторинг
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="tab_content">
                {
                  tab === 5 ? (<Building/>) : tab === 1 ? (<Worker />) : tab === 2 ? (<Shed />) : tab === 3 ? (<Product />) : tab === 4 ? (<System/>) : null
                }
            </div>
        </div>
    )
}

export default Main;
