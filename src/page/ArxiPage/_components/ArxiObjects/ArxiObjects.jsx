import React, { useEffect, useState } from 'react'
import './ArxiObjects.scss'
import { Container } from 'react-bootstrap'
import apiRoot from '../../../../store/apiRoot'
import { useNavigate } from 'react-router-dom'
const ArxiObjects = () => {
    const token = localStorage.getItem('access_token')
    const [objects, setObjects] = useState()
    const navigate = useNavigate()
    const AllObject = () => {
        apiRoot.get('objects/list', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setObjects(res?.data)
        })
    }
    useEffect(() => {
        AllObject()
    }, [])
    return (
        <div className="arxi_obj">
            <Container fluid="xxl">
                <div className='build_list'>
                    {objects?.map((item, index) => (
                        <>
                            <div className='cards' key={item?.id}>
                                <div className='card_items' eventKey={item?.id}>
                                    <div className='card_head'>
                                        <div className="title">
                                            <h4>{item?.name}</h4>
                                        </div>
                                    </div>
                                    <div className='card_body'>
                                        <ul>
                                            <li>
                                                <p>Имя объекта:</p>
                                                <p className='line'></p>
                                                <p>{item?.name}</p>
                                            </li>
                                            <li>
                                                <p>Адрес объекта:</p>
                                                <p className='line'></p>
                                                <p>{item?.address}</p>
                                            </li>
                                            <li>
                                                <p>Имя сотрудника:</p>
                                                <p className='line'></p>
                                                <p>{item?.worker?.name}</p>
                                            </li>
                                            <li>
                                                <p>Телефон сотрудника:</p>
                                                <p className='line'></p>
                                                <p>+{item?.worker?.phone}</p>
                                            </li>
                                            <li className='form_btn_edit'>
                                                <button type='submit' className='in' onClick={() => navigate(`arxiobjs/${item?.id}`)}>
                                                    Добавить смета 
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default ArxiObjects