import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import './MyProduct.scss'
import apiRoot from '../../../../../store/apiRoot'
import { useParams } from 'react-router-dom'
import Edit from "../../../../../assets/image/svg/edit.svg";
import TrashIcon from '../../../../../assets/image/png/trash-red.png'
const MyProduct = () => {
    const { id } = useParams()
    const token = localStorage.getItem('access_token')
    const [all, setAll] = useState()
    const GetAllProduct = () => {
        apiRoot.get(`products/list/warehouse/all/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setAll(res?.data)
        })
    }
    useEffect(() => {
        GetAllProduct()
    }, [])
    return (
        <div className='my_product'>
            <Container fluid="md">
                <div className="teacher_page mt-4">
                    <table responsive variant='#F3F6FA'>
                        <thead className='table__head'>
                            <tr>
                                <th col-md-1>№</th>
                                <th col-md-2>Название</th>
                                <th col-md-2>Количество</th>
                                <th col-md-2>Цена</th>
                                <th col-md-2>Общий сумма</th>
                                <th col-md-1></th>
                                <th col-md-1></th>
                            </tr>
                        </thead>
                        <tbody className='table__body'>
                            {all?.map((item, index) => (
                                <tr key={item?.id}>
                                    <td col-md-1>{index + 1}</td>
                                    <td col-md-2>{item?.name} </td>
                                    <td col-md-2>{item?.amount} {item?.size} </td>
                                    <td col-md-1>{Number(item?.price).toLocaleString()} сум</td>
                                    <td col-md-1>{Number(item?.total_price)?.toLocaleString()} сум</td>
                                    <td col-md-1 className='table_edit'>
                                        <img src={Edit} alt="editImage" />
                                    </td>
                                    <td col-md-1 className='table_trash'>
                                        <img src={TrashIcon} alt="editImage" />
                                    </td>
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

export default MyProduct