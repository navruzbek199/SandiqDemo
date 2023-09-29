import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import build from '../../../assets/image/ABEKT.svg'
import Add from '../../../assets/image/svg/add.svg';
import './Building.scss'
import Modal from '../../../components/SuperModal/SuperModal'
import SelectSearch from "react-select-search";
import apiRoot from '../../../store/apiRoot';
import EditIcon from '../../../assets/image/svg/edit-text.png'
import TrashIcon from '../../../assets/image/svg/trash-can.png'
import Noty from 'noty'
import { useNavigate } from 'react-router-dom';
import { HiDotsVertical } from 'react-icons/hi';
const Building = () => {
    const token = localStorage.getItem('access_token')
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [dalete, setDalete] = useState(false)
    const [id, setId] = useState()
    const [options, setOptions] = useState([])
    const [value, setValue] = useState([])
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [objects, setObjects] = useState()
    const [allworker, setAllworker] = useState()
    const [edit, setEdit] = useState(false)
    const [changeName, setChangeName] = useState()
    const [changeAddress, setChangeAddress] = useState()
    const [changeValue, setChangeValue] = useState()
    const [click, setClick] = useState(null)
    const ref = useRef()
    const handleClick = (id) => {
      if (click?.bolen) {
        setClick({
          id: id,
          bolen: false
        })
  
      } else {
        setClick({
          id: id,
          bolen: true
        })
      }
    }
    
    const AllObject = () => {
        apiRoot.get('objects/list', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setObjects(res?.data)
        })
    }
    useEffect(() => {
        AllObject()
    }, [])
    const AllWorker = () => {
        apiRoot.get(`workers/list`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setAllworker(res?.data)
        })
    }
    useEffect(() => {
        AllWorker()
    }, [])
    useEffect(() => {
        const g = allworker?.map((item) => {
            return {
                name: item?.name,
                value: item?.id
            }
        })
        setOptions(g)
    }, [allworker])
    const GetIdShed = (ids) => {
        apiRoot.get(`objects/view/${ids}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res?.data, "id get");
            setChangeName(res?.data?.name)
            setChangeAddress(res?.data?.address)
            setChangeValue(res?.data?.worker?.name)
        })
    }
    const EditShed = (e) => {
        e.preventDefault()
        const data = {
            name: changeName,
            address: changeAddress,
            worker: changeValue
        }
        apiRoot.put(`objects/edit/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setEdit(false)
            apiRoot.get(`objects/list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setObjects(res?.data)
            }).catch((err) => {
                console.log(err);
            })
        })
    }


    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: name,
            address: address,
            worker: value
        }
        apiRoot.post(`objects/create`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setOpen(false)
            apiRoot.get('objects/list', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res?.data);
                setObjects(res?.data)
            })
        }).catch((err) => {
            console.log(err);
        })
    }
    const DeleteTeacher = () => {
        apiRoot.delete(`objects/delete/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            },
        ).then(res => {
            console.log(res?.data, "bu delete")
            setDalete(false)
            apiRoot.get('objects/list', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res?.data);
                setObjects(res?.data)
            })
            setTimeout(function () {
                new Noty({
                    text: "Oбъект успешно удалён!",
                    layout: "topCenter",
                    type: "success",
                    timeout: 2000
                }).show()
            }, 500)
        })
    }


    return (
        <div className='building'>
            <Container fluid="xxl">
                <div className="teacher_menu">
                    {localStorage.getItem("role") !== "arxitektor" ? 
                        <div className="blog__add">
                            <button className='add__btn add_teacher' onClick={() => setOpen(true)}>
                                <img src={Add} alt="icon_add" />
                                Добавить объект
                            </button>
                        </div>
                        : null
                    }
                </div>
                <div className='build_list'>
                    {objects?.map((item, index) => (
                        <>
                            <div className='cards' key={item?.id}>
                                <div className='card_items' eventKey={item?.id}>
                                    <div className='card_head'>
                                        <div className="title">
                                            <h4>{item?.name}</h4>
                                            <div className="info" onClick={() => handleClick(item?.id)} ref={ref}>
                                                <HiDotsVertical size={"30"} color={"#000"} className={click ? "active" : "noactive"} />
                                            </div>
                                            {click?.id === item?.id && click?.bolen ?
                                                <div className='info_icons'>
                                                    <div className="btn_drop">
                                                        <button type='submit' className='save' onClick={() => {
                                                            setEdit(true)
                                                            setId(item?.id)
                                                            GetIdShed(item?.id)
                                                            setClick({
                                                                id: item?.id,
                                                                bolen: false
                                                            })
                                                        }}>
                                                            <img src={EditIcon} alt="" /> Изменить
                                                        </button>
                                                        <hr />
                                                        <button type='submit' className='delete' onClick={() => {
                                                            setDalete(true)
                                                            setId(item?.id)
                                                            setClick({
                                                                id: item?.id,
                                                                bolen: false
                                                            })
                                                        }}>
                                                            <img src={TrashIcon} alt="" /> Удалить
                                                        </button>
                                                    </div>
                                                </div>
                                                : null
                                            }
                                        </div>
                                    </div>
                                    <div className='card_body'>
                                        <ul>
                                            <li>
                                                <p>Имя объекта:</p>
                                                <p className='line'></p>
                                                <p>{item?.name}</p>
                                            </li>
                                            <li>
                                                <p>Адрес объекта:</p>
                                                <p className='line'></p>
                                                <p>{item?.address}</p>
                                            </li>
                                            <li>
                                                <p>Имя сотрудника:</p>
                                                <p className='line'></p>
                                                <p>{item?.worker?.name}</p>
                                            </li>
                                            <li>
                                                <p>Телефон сотрудника:</p>
                                                <p className='line'></p>
                                                <p>+{item?.worker?.phone}</p>
                                            </li>
                                            <li className='form_btn_edit'>
                                                <button type='submit' className='in' onClick={() => navigate(`objects/${item?.id}`)}>
                                                    Войти
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                    }
                </div>
            </Container>
            {open && <Modal set={setOpen} height={450} maxWidth={830} cancel={true}>
                <div className="teacher_add_modal">
                    <div className="teacher_modal_name">
                        <h4>
                            Добавить объект
                        </h4>
                    </div>
                    <form onClick={(e) => onSubmit(e)}>
                        <div className="form_group">
                            <label>Name*</label>
                            <input type="text"
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form_group">
                            <label>Address*</label>
                            <input type="text"
                                onChange={(e) => setAddress(e.target.value)}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form_group_select">
                            <label>Worker*</label>
                            <div className="form_control">
                                <SelectSearch
                                    options={options}
                                    value={value}
                                    onChange={setValue}
                                    search
                                    placeholder="Ushbu obyektga xodimni tayinlang"
                                />
                            </div>
                        </div>
                        <div className="form_btn">
                            <button type='submit'>
                                Сохранить
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>}
            {dalete && <Modal set={setDalete} height={350} maxWidth={530} cancel={false}>
                <div className="delete_teacher">
                    <div className="delete_title">
                        <h4>Удалить</h4>
                    </div>
                    <div className="delete_text">
                        <p>Вы действительно хотите удалить этого объект?</p>
                    </div>
                    <div className="delete_btn gap-2">
                        <button className='cancel' onClick={() => setDalete(false)}>Отменить</button>
                        <button onClick={() => DeleteTeacher()}>Удалить</button>
                    </div>
                </div>
            </Modal>}
            {edit && <Modal set={setEdit} height={450} maxWidth={830} cancel={true}>
                <div className="teacher_add_modal">
                    <div className="teacher_modal_name">
                        <h4>
                            Редактировать
                        </h4>
                    </div>
                    <form onSubmit={(e) => EditShed(e)}>
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
                            <label>Address*</label>
                            <input type="text"
                                onChange={(e) => setChangeAddress(e.target.value)}
                                value={changeAddress}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form_group_select">
                            <label>Worker*</label>
                            <div className="form_control">
                                <SelectSearch
                                    options={options}
                                    value={changeValue}
                                    onChange={setChangeValue}
                                    search
                                    placeholder="Ushbu objectga xodimni tayinlang"
                                />
                            </div>
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
        </div>
    )
}

export default Building