import React, { useEffect, useState } from 'react'
import './Sms.scss'
import { Link, useLocation, useParams } from 'react-router-dom'
import apiRoot from '../../../store/apiRoot'
import { Col, Container, Row } from 'react-bootstrap'
import ArrowLeft from '../../../assets/image/svg/arrow-left.png'
const Sms = () => {
    const { id } = useParams()
    const { search } = useLocation()
    const token = localStorage.getItem('access_token')
    const [sms, setSms] = useState()
    const [comparison, setComparison] = useState()
    useEffect(() => {
        apiRoot.get(`bid/view/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setSms(res?.data)
        })
        apiRoot.get(`bid/comparison/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res?.data);
            setComparison(res?.data)
        })
    }, [id, search])
    const time  = (str) => {
        const newTime = new Date(str)
        return newTime.toLocaleTimeString() + " " + newTime.toLocaleDateString()
    }
    console.log(comparison, "comparison");

    // const newSms = async () => {
    //     firestore.collection("messages").add({
    //         uid: Date.now(),
    //         displayName: "admin",
    //         role_to: 's_admin',
    //         status: true,
    //         bid_id: "",
    //         werehouse_id: "",
    //         createdAt: String(new Date()),
    //     });
    //     setNewMessage("");
    // }


    return (
        <div className='sms'>
            <div className="blog_header">
                <Container fluid="md">
                    <div className="blog">
                        <div className="className_title">
                            <Link to="/home">
                                <img src={ArrowLeft} alt="" />
                                <div className="title">
                                    <h4>Заявка</h4>
                                    <h2>
                                    {time(sms?.created_at)}
                                    </h2>
                                </div>
                            </Link>
                            <div className="title">
                                <p>Название объекта: <span>{sms?.object}</span></p>
                                <p>Имя: <span>{sms?.worker}</span></p>
                                <p>Телефон: <span>+{sms?.phone}</span></p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <Row>
                    <div className="tab_content">
                        <div className="teacher_page mt-4">
                            <table responsive variant='#F3F6FA'>
                                <thead className='table__head'>
                                    <tr>
                                        <th col-md-1>№</th>
                                        <th col-md-2>Название</th>
                                        <th col-md-2>Количество</th>
                                        {/* <th col-md-1>Название объекта</th>
                                        <th col-md-2>Имя</th>
                                        <th col-md-2>Телефон</th> */}
                                        <th col-md-2>Имя cклада</th>
                                    </tr>
                                </thead>
                                <tbody className='table__body'>
                                    {sms?.products?.map((item, index) => (
                                        <tr key={item?.id}>
                                            <td col-md-1>{index + 1}</td>
                                            <td col-md-2>{item?.name}</td>
                                            <td col-md-2>{item?.amount} {item?.size}</td>
                                            {/* <td col-md-1>{sms?.object}</td>
                                            <td col-md-1>{sms?.worker}</td>
                                            <td col-md-1>+{sms?.phone}</td> */}
                                                <td col-md-2>
                                                    {comparison?.filter((elem) => elem?.id === item?.id)?.map((item) => (
                                                        <div className='table_list_phone mt-1'>
                                                            {item?.warehouse?.name} 
                                                        </div>
                                                    ))
                                                    }
                                                </td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Col md="6">
                        <div className="description">
                            <div className="des_head">
                                <h6>Описание</h6>
                            </div>
                            <div className="des_body">
                                <p>{sms?.description}</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={{ span: 5, offset: 1 }}>
                        <div className="send_btn gap-4">
                            <button className='send'>Подтвердить</button>
                            <button className='cancel'>Oтменить заявка</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Sms