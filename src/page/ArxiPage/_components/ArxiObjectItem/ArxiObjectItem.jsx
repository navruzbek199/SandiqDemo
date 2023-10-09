import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { Link, useNavigate, useParams } from 'react-router-dom'
import apiRoot from '../../../../store/apiRoot'
import Add from '../../../../assets/image/svg/add.svg';
import './ArxiObjectItem.scss';
import SmetaTable from '../SmetaTable/SmetaTable'
const ArxiObjectItem = () => {
    const { id } = useParams()
    const token = localStorage.getItem("access_token")
    const [getId, setGetId] = useState()
    const [options, setOptions] = useState([])
    const [getUnit, setGetUnit] = useState()
    const [size, setSize] = useState()
    
    const Units = () => {
        apiRoot.get(`products/units`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setGetUnit(res?.data)
        })
    }
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
        const g = getUnit?.map((item) => {
            return {
                name: item?.abbreviation,
                value: item?.abbreviation
            }
        })
        setOptions(g)
    }, [getUnit])
    useEffect(() => {
        getIdShed()
        Units()
    }, [])

    




    const [arr, setArr] = useState([1])


    const addSection = () => {
        setArr([...arr, 1])
    }

    const [totalPrice,setTotalPrice] = useState(0)


    const onSubmit = () => {
        let locData = []
        arr?.forEach((_,index) => {
            locData.push(JSON.parse(localStorage.getItem(`data${index}`)))
        })
        const data = {
            object_id: id,
            data_array: locData,
            total_price: totalPrice
        }
        console.log(data,"data sbmot");
        apiRoot.post(`products/create/set`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res?.data);
        }).catch((err) => {
            console.log(err);
        })


        
    }
    return (
        <div className='arxi_obj_item'>
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
                {
                    arr.map((item,index) => (
                        <SmetaTable options={options} setTotalPrice={setTotalPrice} index={index} />
                    ))
                }
                <div className='btns_table'>
                    <button className='add__btn' onClick={addSection}>
                        <img src={Add} alt="icon_add" />
                        Bo'lim qo'shish
                    </button>
                    <p>
                        Obyekt uchun ketadigan umumiy summa: <span>{totalPrice?.toLocaleString()} so`m</span>
                    </p>
                    <button className='save_btn' onClick={onSubmit}>
                        Saqlash
                    </button>
                </div>
            </Container>

        </div>
    )
}

export default ArxiObjectItem