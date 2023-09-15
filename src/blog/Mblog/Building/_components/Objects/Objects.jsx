import React, { useEffect, useState } from 'react'
import './Objects.scss'
import { Container } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import ArrowLeft from '../../../../../assets/image/svg/arrow-left.png'
import build from '../../../../../assets/image/ABEKT.svg'
import apiRoot from '../../../../../store/apiRoot'
const Objects = () => {
    const token  = localStorage.getItem('access_token')
    const { id } = useParams()
    const [getId, setGetId] = useState()
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
    useEffect(() => {
        getIdShed()
    }, [])
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
        </div>
    )
}

export default Objects