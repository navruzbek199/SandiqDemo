import React, { useEffect, useState } from 'react'
import './ProductItem.scss'
import { Link, useParams } from 'react-router-dom'
import ArrowLeft from '../../../../../assets/image/svg/arrow-left.png'
import { Container } from 'react-bootstrap'
import apiRoot from '../../../../../store/apiRoot'
const ProductItem = () => {
    const { id } = useParams()
    const token = localStorage.getItem('access_token')
    const [getId, setGetId] = useState()
    const getIdProduct = () => {
        apiRoot.get(`products/list/view/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setGetId(res?.data)
        })
    }
    useEffect(() => {
        getIdProduct()
    }, [])
    return (
        <div className='product_item'>
            <div className="blog_header">
                <Container fluid="md">
                    <div className="blog">
                        <div className="className_title">
                            <Link to="/home">
                                <img src={ArrowLeft} alt="" />
                                <div className="title">
                                    <h4>{getId?.name}</h4>
                                </div>
                            </Link>
                            <div className="title">
                                <p>Название продукта : <span>{getId?.name}</span></p>
                                <p>Стоимость продукта : <span>{Number(getId?.price)?.toLocaleString()}</span> сум</p>
                                <p>Единица продукта : <span>{getId?.size}</span></p>
                            </div>
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
                                    <th col-md-2>Название</th>
                                    <th col-md-2>Количество</th>
                                    <th col-md-1>Цена продукта</th>
                                    <th col-md-2>Название склада</th>
                                    <th col-md-2>Адрес</th>
                                </tr>
                            </thead>
                            <tbody className='table__body'>
                                {getId?.products_base?.map((item, index) => (
                                    <tr key={item?.id}>
                                        <td col-md-1>{index + 1}</td>
                                        <td col-md-2>{getId?.name} </td>
                                        <td col-md-2>{item?.amount} {getId?.size} </td>
                                        <td col-md-1>{Number(item?.total_price)?.toLocaleString()} сум</td>
                                        <td col-md-1>{item?.warehouse?.name}</td>
                                        <td col-md-1>{item?.warehouse?.address}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ProductItem