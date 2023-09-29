import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import apiRoot from '../../../../store/apiRoot'
import './ArxiProduct.scss'
const ArxiProduct = () => {
    const token  = localStorage.getItem("access_token")
    const [product, setProduct] = useState()
    useEffect(() => {
        apiRoot.get(`products/list`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data);
            setProduct(res?.data)
        })
    }, [])
    return (
        <div className='arxi_product'>
            <Container fluid='xxl'>
                <div className="teacher_page">
                    <table responsive variant='#F3F6FA'>
                        <thead className='table__head'>
                            <tr>
                                <th col-md-1>№</th>
                                <th col-md-2>Название</th>
                                <th col-md-2>Количество</th>
                                <th col-md-1>Единица</th>
                                <th col-md-2>Стоимость</th>
                            </tr>
                        </thead>
                        <tbody className='table__body'>
                            {product?.map((item, index) => (
                                <tr key={item?.id}>
                                    <td col-md-1>{index + 1}</td>
                                    <td col-md-2>{item?.name} </td>
                                    <td col-md-2>{item?.amount} </td>
                                    <td col-md-1>{item?.size}</td>
                                    <td col-md-1>{Number(item?.price)?.toLocaleString()} сум</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    )
}

export default ArxiProduct