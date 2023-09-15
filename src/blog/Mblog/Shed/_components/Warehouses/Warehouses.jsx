import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import ArrowLeft from '../../../../../assets/image/svg/arrow-left.png'
import './Warehouses.scss'
import apiRoot from '../../../../../store/apiRoot'
import Edit from "../../../../../assets/image/svg/edit.svg";
import TrashIcon from '../../../../../assets/image/png/trash-red.png'
import Income from '../../../../../assets/image/svg/arrow-down-right-square-fill.svg'
import Outgo from '../../../../../assets/image/svg/arrow-up-right-square-fill.svg'
import moment from 'moment'
import MyProduct from '../MyProduct/MyProduct'
const Warehouses = () => {
    const { id } = useParams()
    // const tabRef = useRef(1)
    const [tab, setTab] = useState("all")
    const [all, setAll] = useState(null)
    const [getId, setGetId] = useState()
    const [product, setProduct] = useState()
    const [filterData, setFilterData] = useState(null)
    const token = localStorage.getItem('access_token')
    const getIdShed = () => {
        apiRoot.get(`warehouses/view/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res?.data);
            setGetId(res?.data)
        })
    }
    const getProduct = () => {
        apiRoot.get(`products/list/warehouse/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setProduct(res?.data)
            let respon = res?.data
            for (const key in respon) {
                if (Object.hasOwnProperty.call(respon, key)) {
                    const element = respon[tab];
                    setFilterData(element)
                }
            }
        })
    }
    useEffect(() => {
        getProduct()
        getIdShed()
    }, [])

    const onChangeTab = (str) => {
        setAll(null)
        setTab(str)
        for (const key in product) {
            if (Object.hasOwnProperty.call(product, key)) {
                const element = product[str];
                setFilterData(element)
            }
        }
    }

    // {item?.date.slice(0, 10)} {item?.date?.slice(11, 16)}
    // const FilterProduct = () => {
    //  const data = filterData?.sort((a,b) => a.name.localeCompare(b.name))
    //  setFilterData(data)
    // }

    return (
        <>
            <div className="warehouses">
                <div className="blog_header">
                    <Container fluid="md">
                        <div className="blog">
                            <div className="className_title">
                                <Link to="/home">
                                    <img src={ArrowLeft} alt="" />
                                    <div className="title">
                                        <h4>{getId?.name} cклад</h4>
                                    </div>
                                </Link>
                                <div className="title">
                                    <h6><span>Админ склада:</span>{getId?.worker?.name}</h6>
                                    <h6><span>Адрес:</span>{getId?.address}</h6>
                                    <h6><span>Телефон:</span>+{getId?.worker?.phone}</h6>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                <Container fluid="md">
                    <Row>
                        <Col md={5}>
                            <div className="tab_table">
                                <ul>
                                    <li onClick={() => onChangeTab("all")} className={tab === "all" ? 'active' : "time_tab_class"}>
                                        Все
                                    </li>
                                    <li onClick={() => onChangeTab("incoming")} className={tab === "incoming" ? 'active1' : "time_tab_class1"}>
                                        <img src={Income} alt="icon" className='mr-1' />
                                        Входящие
                                    </li>
                                    <li onClick={() => onChangeTab("outgoing")} className={tab === "outgoing" ? 'active2' : "time_tab_class2"}>
                                        <img src={Outgo} alt="icon" className='mr-1' />
                                        Выходящие
                                    </li>
                                </ul>

                            </div>
                        </Col>
                        <Col md={{ span: 2, offset: 5 }}>
                            <div className="tab_table">
                                <ul>
                                    <li onClick={() => {
                                        setAll(1)
                                        setTab(null)
                                        
                                    }} className={all === 1 ? 'my_product_list' : "my_product"}>
                                        Мой склад
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <div className="tab_content">
                       { tab !== null && <div className="teacher_page mt-4">
                            <table responsive variant='#F3F6FA'>
                                <thead className='table__head'>
                                    <tr>
                                        <th col-md-1>№</th>
                                        <th col-md-2>Название</th>
                                        <th col-md-2>Количество</th>
                                        <th col-md-1>Дата</th>
                                        <th col-md-2>Стоимость</th>
                                        <th col-md-2>Доставщик</th>
                                        <th col-md-2>Телефон</th>
                                        <th col-md-2>Статус</th>
                                        <th col-md-1></th>
                                        <th col-md-1></th>
                                    </tr>
                                </thead>
                                <tbody className='table__body'>
                                    {filterData?.map((item, index) => (
                                        <tr key={item?.id}>
                                            <td col-md-1>{index + 1}</td>
                                            <td col-md-2>{item?.name} </td>
                                            <td col-md-2>{item?.amount} {item?.size} </td>
                                            <td col-md-1>{moment(item?.date).format("MMM Do, h:mm")?.slice(0, 6)} {moment(item?.date).format("MMM Do, h:mm")?.slice(8, 15)}</td>
                                            <td col-md-1>{Number(item?.total_price)?.toLocaleString()} so'm</td>
                                            <td col-md-1>{item?.delivery?.name}</td>
                                            <td col-md-1>+{item?.delivery?.phone}</td>
                                            <td col-md-2 className='status'>
                                                {item?.status === true ? <img className='come' src={Income} alt='icon' /> : item?.status === false ? <img className='out' src={Outgo} alt='icon' /> : null}
                                            </td>
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
                        </div>}
                        {all !== null ? <MyProduct/> : null}
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Warehouses