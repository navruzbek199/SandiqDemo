import React, { useEffect, useState } from 'react'
import './Objects.scss'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ArrowLeft from '../../../../../assets/image/svg/arrow-left.png'
import build from '../../../../../assets/image/ABEKT.svg'
import apiRoot from '../../../../../store/apiRoot'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
const Objects = () => {
    firebase.initializeApp({
        apiKey: "AIzaSyAweODwWAa3klYmgJLjNoBL9cvTJDn8BLI",
        authDomain: "e-work-9007c.firebaseapp.com",
        projectId: "e-work-9007c",
        storageBucket: "e-work-9007c.appspot.com",
        messagingSenderId: "626928554871",
        appId: "1:626928554871:web:0de76fb140d232bd278772",
        measurementId: "G-Y0RY9TZVLZ"
    });
    const firestore = firebase.firestore()
    const [messages, loading] = useCollectionData(
        firestore.collection("messages").orderBy("createdAt")
    )
    const token = localStorage.getItem('access_token')
    const { id } = useParams()
    const [getId, setGetId] = useState()
    const [tab, setTab] = useState(1)
    const getIdShed = () => {
        apiRoot.get(`objects/view/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res?.data);
            setGetId(res?.data)
        })
    }
    const navigate = useNavigate()
    useEffect(() => {
        getIdShed()
    }, [])
    const time = (str) => {
        const newTime = new Date(str)
        return newTime.toLocaleTimeString() + " " + newTime.toLocaleDateString()
    }
    const filterData = messages?.filter((item) => item?.role_to === "admin")
    const filterId = (id) => {
        const data = filterData.filter((item) => item?.bid_id === id)[0]
        const link = data?.uid
        navigate(`/home/noty/${id}/?${link}`)
    }
    return (
        <div className='objects'>
            <div className="blog_header">
                <Container fluid="md">
                    <div className="blog">
                        <div className="className_title">
                            <Link to="/home">
                                <img src={ArrowLeft} alt="" />
                                <div className="title">
                                    <img src={build} alt="" />
                                    <h4>{getId?.name}</h4>
                                </div>
                            </Link>
                            <div className="title">
                                <h6><span>Админ объект:</span>{getId?.worker?.name}</h6>
                                <h6><span>Адрес:</span>{getId?.address}</h6>
                                <h6><span>Телефон:</span>+{getId?.worker?.phone}</h6>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <Row>
                    <Col md={6}>
                        <div className="tab_table">
                            <ul>
                                <li onClick={() => setTab(1)} className={tab === 1 ? 'active1' : "time_tab_class1"}>
                                    Мая заявка
                                </li>
                                <li onClick={() => setTab(2)} className={tab === 2 ? 'active1' : "time_tab_class1"}>
                                    Мои продукты
                                </li>
                            </ul>

                        </div>
                    </Col>
                </Row>
                <div className="tab_content">
                    {
                        tab === 1 ?   
                            <div className="teacher_page mt-4">
                                <table responsive variant='#F3F6FA'>
                                    <thead className='table__head'>
                                        <tr>
                                            <th col-md-1>№</th>
                                            <th col-md-2>Всe сумма</th>
                                            <th col-md-2>Время</th>
                                            <th col-md-2>Статус</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table__body'>
                                        {getId?.bids?.sort((a, b) => a?.created_at?.localeCompare(b?.created_at)).reverse()?.map((item, index) => (
                                            <tr key={item?.id}>
                                                <td col-md-1>{index + 1}</td>
                                                <td col-md-2>{item?.total_summa?.toLocaleString()} сум</td>
                                                <td col-md-2>{time(item?.created_at)}</td>
                                                <td col-md-2 style={{ cursor: "pointer" }} onClick={() => navigate(`/home/noty/${item?.id}`)}>{item?.status === "yuborilgan" ? <span onClick={() => filterId(item.id)} className='new'>new sms</span> : item?.status === "qaytarildi" ? <span className='cancel'>cancel</span> : item?.status === "tasdiqlandi" ? <span className='succes'>success</span> : null}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        : tab === 2 ? 
                            "tab2"
                        : null
                    }
                </div>
            </Container>
        </div>
    )
}

export default Objects