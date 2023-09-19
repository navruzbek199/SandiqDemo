import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import ArrowLeft from '../../../../assets/image/svg/arrow-left.png'
import '../Sms.scss'
import apiRoot from '../../../../store/apiRoot'
import Info from '../../../../assets/image/svg/info_pro.svg'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import { GlobalContex } from '../../../../store/Contex'
const SmsHistory = () => {
    const { data } = useContext(GlobalContex)
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
    const [history, setHistory] = useState()
    const navigate = useNavigate()
    const GetHistoryNoty = () => {
        apiRoot.get(`bid/list`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setHistory(res?.data)
            console.log(res?.data, "sms his");
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        GetHistoryNoty()
        data.splice(0,data.length)
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
        <div className='sms'>
            <div className="blog_header">
                <Container fluid="md">
                    <div className="blog">
                        <div className="className_title">
                            <Link to="/home">
                                <img src={ArrowLeft} alt="" />
                                <div className="title">
                                    <h4>Заявка история</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <div className="tab_content">
                    <div className="teacher_page mt-4">
                        <table responsive variant='#F3F6FA'>
                            <thead className='table__head'>
                                <tr>
                                    <th col-md-1>№</th>
                                    <th col-md-2>Название объекта</th>
                                    <th col-md-2>Время</th>
                                    <th col-md-2>Имя</th>
                                    <th col-md-2>Телефон</th>
                                    <th col-md-2>Статус</th>
                                </tr>
                            </thead>
                            <tbody className='table__body'>
                                {history?.sort((a, b) => a?.created_at?.localeCompare(b?.created_at)).reverse()?.map((item, index) => (
                                    <tr key={item?.id}>
                                        <td col-md-1>{index + 1}</td>
                                        <td col-md-2>{item?.object?.name}</td>
                                        <td col-md-2>{time(item?.created_at)}</td>
                                        <td col-md-2>{item?.object?.worker}</td>
                                        <td col-md-2>{item?.object?.phone}</td>
                                        <td col-md-2 style={{cursor: "pointer"}} onClick={() => navigate(`/home/noty/${item?.id}`)}>{item?.status === "yuborilgan" ? <span onClick={() => filterId(item.id)} className='new'>new sms</span> : item?.status === "qaytarildi" ? <span className='cancel'>cancel</span> : item?.status === "tasdiqlandi" ? <span className='succes'>success</span> : null}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default SmsHistory