import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Add from '../../../assets/image/svg/add.svg';
import Edit from "../../../assets/image/svg/edit.svg";
import TrashIcon from '../../../assets/image/png/trash-red.png'
import Modal from '../../../components/SuperModal/SuperModal'
import SelectSearch from "react-select-search";
import './Product.scss'
import apiRoot from '../../../store/apiRoot';
import Info from '../../../assets/image/svg/info_pro.svg'
import { useNavigate } from 'react-router-dom';
const Product = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [dalete, setDalete] = useState(false)
    const token = localStorage.getItem('access_token')
    const [options, setOptions] = useState([])
    const [name, setName] = useState()
    const [cost, setCost] = useState()
    const [size, setSize] = useState()
    const [amount, setAmount] = useState(1)
    const [getUnit, setGetUnit] = useState()
    const [product, setProduct] = useState()
    const [changeName, setChangeName] = useState()
    const [changCost, setChangeCost] = useState()
    const [changeAmount, setChangeAmount] = useState()
    const [id, setId] = useState()
    const Units = () => {
        apiRoot.get(`products/units`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setGetUnit(res?.data)
        })
    }
    const GetProductId = (param) => {
        apiRoot.get(`products/detail/${param}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res?.data);
            setChangeAmount(res?.data?.amount)
            setChangeCost(res?.data?.price)
            setChangeName(res?.data?.name)
            setSize(res?.data?.size)
            setId(res?.data?.id)
        })
    }
    
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
    useEffect(() => {
        Units()
    }, [])
    useEffect(() => {
        const g = getUnit?.map((item) => {
            return {
                name: item?.abbreviation,
                value: item?.abbreviation
            }
        })
        setOptions(g)
    }, [getUnit])
    console.log(size, "nima");
    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: name,
            size: size,
            amount: amount,
            price: cost
        }
        apiRoot.post(`products/create`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res?.data);
            setOpen(false)
            apiRoot.get(`products/list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res.data);
                setProduct(res?.data)
            })
        })
    }
    const onSubmitEdit = (e) => {
        e.preventDefault()
        const data = {
            name: changeName,
            size: size,
            amount: changeAmount,
            price: changCost
        }
        apiRoot.put(`products/edit/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res?.data);
            setEdit(false)
            apiRoot.get(`products/list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res.data);
                setProduct(res?.data)
            })
        })
    }
    const onSubmitDelete = () => {
        apiRoot.delete(`products/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res?.data);
            setDalete(false)
            apiRoot.get(`products/list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res.data);
                setProduct(res?.data)
            })
        })
    }

    return (
        <div>
            <Container fluid='md'>
                <div className="teacher_menu">
                    <div className="blog__add">
                        <button className='add__btn add_teacher' onClick={() => setOpen(true)}>
                            <img src={Add} alt="icon_add" />
                            Добавить продукт
                        </button>
                    </div>
                </div>
                <div className="teacher_page">
                    <table responsive variant='#F3F6FA'>
                        <thead className='table__head'>
                            <tr>
                                <th col-md-1>№</th>
                                <th col-md-2>Название</th>
                                <th col-md-2>Количество</th>
                                <th col-md-1>Единица</th>
                                <th col-md-2>Стоимость</th>
                                <th col-md-1></th>
                                <th col-md-1></th>
                                <th col-md-1></th>
                            </tr>
                        </thead>
                        <tbody className='table__body'>
                            {product?.map((item, index) => (
                                <tr key={item?.id}>
                                    <td col-md-1>{index + 1}</td>
                                    <td col-md-2>{item?.name} </td>
                                    <td col-md-2>{item?.amount} </td>
                                    <td col-md-1>{item?.size}</td>
                                    <td col-md-1>{item?.price}</td>
                                    <td col-md-1 className='table_info' onClick={() => navigate(`product/${item?.id}`)}>
                                        <img src={Info} alt="editImage" />
                                    </td>
                                    <td col-md-1 className='table_edit' onClick={() => {
                                        setEdit(true)
                                        GetProductId(item?.id)
                                    }}>
                                        <img src={Edit} alt="editImage" />
                                    </td>
                                    <td col-md-1 className='table_trash' onClick={() => {
                                        setDalete(true)
                                        GetProductId(item?.id)
                                    }}>
                                        <img src={TrashIcon} alt="editImage" />
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </Container>
            {open && <Modal set={setOpen} height={500} maxWidth={830} cancel={true}>
                <div className="teacher_add_modal">
                    <div className="teacher_modal_name">
                        <h4>
                            Добавить продукт
                        </h4>
                    </div>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="form_group">
                            <label>Name*</label>
                            <input type="text"
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form_group">
                            <label>Amount*</label>
                            <input type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form_group_select">
                            <label>Size*</label>
                            <div className="form_control">
                                <SelectSearch
                                    options={options}
                                    value={size}
                                    onChange={setSize}
                                    search
                                    placeholder="Ushbu birliklarni tanlang"
                                />
                            </div>
                        </div>
                        <div className="form_group">
                            <label>Price*</label>
                            <input type="text"
                                onChange={(e) => setCost(e.target.value)}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form_btn">
                            <button type='submit'>
                                Сохранить
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            }
            {edit && <Modal set={setEdit} height={500} maxWidth={830} cancel={true}>
                <div className="teacher_add_modal">
                    <div className="teacher_modal_name">
                        <h4>
                            Редактировать
                        </h4>
                    </div>
                    <form onSubmit={(e) => onSubmitEdit(e)}>
                        <div className="form_group">
                            <label>Name*</label>
                            <input type="text"
                                onChange={(e) => setChangeName(e.target.value)}
                                value={changeName}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form_group">
                            <label>Amount*</label>
                            <input type="text"
                                onChange={(e) => setChangeAmount(e.target.value)}
                                value={changeAmount}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form_group_select">
                            <label>Size*</label>
                            <div className="form_control">
                                <SelectSearch
                                    options={options}
                                    value={size}
                                    onChange={setSize}
                                    search
                                    placeholder="Ushbu birliklarni tanlang"
                                />
                            </div>
                        </div>
                        <div className="form_group">
                            <label>Price*</label>
                            <input type="text"
                                onChange={(e) => setChangeCost(e.target.value)}
                                value={changCost}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form_btn">
                            <button type='submit'>
                                Сохранить
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            }
            {dalete && <Modal set={setDalete} height={350} maxWidth={530} cancel={false}>
                <div className="delete_teacher">
                    <div className="delete_title">
                        <h4>Удалить</h4>
                    </div>
                    <div className="delete_text">
                        <p>Вы действительно хотите удалить этого продукт?</p>
                    </div>
                    <div className="delete_btn gap-2">
                        <button className='cancel' onClick={() => setDalete(false)}>Отменить</button>
                        <button onClick={()=>onSubmitDelete()}>Удалить</button>
                    </div>
                </div>
            </Modal>}
        </div>
    )
}

export default Product