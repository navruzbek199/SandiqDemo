import React, { useEffect, useState } from 'react'
import './ArxiObjSmeta.scss'
import { Button, Container } from 'react-bootstrap'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import apiRoot from '../../../../store/apiRoot'
import { Link, useParams } from 'react-router-dom'
const ArxiObjSmeta = () => {
    const { id } = useParams()
    const token = localStorage.getItem("access_token")
    const [getId, setGetId] = useState()
    const [getSmeta, setGetSmeta] = useState()
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
    const GetIdSmeta = () => {
        apiRoot.get(`products/set/list/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res?.data, "data get");
            setGetSmeta(res?.data)
        }).catch((err) => {
            console.log(err);
        })
    }
    // const GetDownload = () => {
    //     apiRoot.get(`products/set/download/${id}`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     }).then((res) => {
    //         console.log(res?.data, "download");
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }
    useEffect(() => {
        GetIdSmeta()
    }, [])
    useEffect(() => {
        getIdShed()
    }, [])



    return (
        <div className='arxi_obj_smeta'>
            <div className="blog_header">
                <Container fluid="xxl">
                    <div className="blog">
                        <div className="className_title">
                            <Link to="/arxitector">
                                <BsFillArrowLeftSquareFill size={32} color='#00827B' style={{ marginRight: "12px" }} />
                                <div className="title">
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
            <Container fluid="xxl">
                {getSmeta?.productsets?.map((item, index) => (
                    <div className="smeta_table">
                        {item?.data_array?.map((elem) => (

                            <div className="smeta">
                                <div className="form_input">
                                    <p>{elem?.name}</p>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className='th_first'>№</th>
                                            <th>Tovar nomi</th>
                                            <th>O'lchov birligi</th>
                                            <th>Soni</th>
                                            <th>Narxi</th>
                                            <th>Umumiy narxi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {elem?.products?.filter((_, index) => index > 0)?.map((item, index) => (
                                            <tr key={item?.id}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {item?.name}
                                                </td>
                                                <td>
                                                    {item?.size}
                                                </td>
                                                <td>
                                                    {item?.amount}
                                                </td>
                                                <td>
                                                    {Number(item?.price).toLocaleString()}
                                                </td>
                                                <td>
                                                    {Number(item?.amount * item?.price).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        ))
                        }
                        <div className="form_text">
                            <p>
                                Umumiy narxi:
                            </p>
                            <span>
                                {Number(item?.total_price)?.toLocaleString()}
                            </span>
                        </div>
                    </div>
                ))}
                <div className="form_text_all">
                    <p>
                        Umumiy narxi:
                    </p>
                    <span>
                        {(getSmeta?.total_price)} so'm
                    </span>
                </div>
            </Container>

        </div>
    )
}

export default ArxiObjSmeta