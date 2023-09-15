import React, { useEffect, useState } from 'react'
import './Sms.scss'
import { Link, useLocation, useParams } from 'react-router-dom'
import apiRoot from '../../../store/apiRoot'
import { Col, Container, Row } from 'react-bootstrap'
import ArrowLeft from '../../../assets/image/svg/arrow-left.png'
import firebase from "firebase/compat/app";
const Sms = () => {
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
    const { id } = useParams()
    const { search } = useLocation()
    const token = localStorage.getItem('access_token')
    const [sms, setSms] = useState()
    const uid = search.substring(1, search?.length)
    const onUpdate = () => {
        firestore.collection("messages").where("uid", "==", uid)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.update({status: false})
            });
       })
      };
    useEffect(() => {
        apiRoot.get(`bid/view/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setSms(res?.data)
        })
        onUpdate()
    }, [id, search])
    const time  = (str) => {
        const newTime = new Date(str)
        return newTime.toLocaleTimeString()
    }
    
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
                                </div>
                            </Link>
                            <div className="title">
                                <p>Время сообщения : <span>{time(sms?.created_at)}</span></p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <Row>
                    <Col md="8">
                        <div className="tab_content">
                            <div className="teacher_page mt-4">
                                <table responsive variant='#F3F6FA'>
                                    <thead className='table__head'>
                                        <tr>
                                            <th col-md-1>№</th>
                                            <th col-md-2>Название</th>
                                            <th col-md-2>Количество</th>
                                            <th col-md-1>Название объекта</th>
                                            <th col-md-2>Имя</th>
                                            <th col-md-2>Телефон</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table__body'>
                                        {sms?.products?.map((item, index) => (
                                            <tr key={item?.id}>
                                                <td col-md-1>{index + 1}</td>
                                                <td col-md-2>{item?.name}</td>
                                                <td col-md-2>{item?.amount} {item?.size}</td>
                                                <td col-md-1>{sms?.object}</td>
                                                <td col-md-1>{sms?.worker}</td>
                                                <td col-md-1>+{sms?.phone}</td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Col>
                    <Col md="4">

                    </Col>
                    <Col md="8">
                        <div className="description">
                            <div className="des_head">
                                <h6>Описание</h6>
                            </div>
                            <div className="des_body">
                                <p>{sms?.description}</p>
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="send_btn">

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Sms