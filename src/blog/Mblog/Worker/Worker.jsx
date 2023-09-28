import React, { useEffect, useState } from 'react'
import './Worker.scss'
import { Container } from 'react-bootstrap'
import Add from '../../../assets/image/svg/add.svg';
import apiRoot from '../../../store/apiRoot';
import Modal from '../../../components/SuperModal/SuperModal'
import InputMask from 'react-input-mask'
import WorkerItem from './_components/WorkerItem';
const Worker = () => {
    const token = localStorage.getItem('access_token')
    const [open, setOpen] = useState(false)
    const [allworker, setAllworker] = useState()
    const [fullname, setFullname] = useState()
    const [username, setUsername] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [role, setRole] = useState()
    // const [id, setId] = useState()
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
    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: fullname,
            username: username,
            role:role,
            phone: phoneNumber?.replace(/[^0-9]/g, "")
        }
        apiRoot.post(`workers/create`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setOpen(false);
            apiRoot.get(`workers/list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setAllworker(res?.data)
            })
        })

    }








    return (
        <div>
            <Container fluid='xxl'>
                <div className="teacher_menu">
                    <div className="blog__add">
                        <button className='add__btn add_teacher' onClick={() => setOpen(true)}>
                            <img src={Add} alt="icon_add" />
                            Добавить сотрудников
                        </button>
                    </div>
                </div>
                <div className="teacher_page">
                    <table variant='#F3F6FA'>
                        <thead className='table__head'>
                            <tr>
                                <th col-md-1>№</th>
                                <th col-md-2>Ф.И.О</th>
                                <th col-md-2>Имя пользователя</th>
                                <th col-md-2>Роль</th>
                                <th col-md-1>Телефон</th>
                                <th col-md-1>Имя cклада</th>
                                <th col-md-1>Адрес склада</th>
                                <th col-md-1></th>
                                <th col-md-1></th>
                            </tr>
                        </thead>
                        <tbody className='table__body'>
                            {
                                allworker?.filter(elem => elem?.role !== "driver")?.map((item, index) => (
                                    <WorkerItem key={item?.id} item={item} index={index} setAllworker={setAllworker} />
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
                            Добавить сотрудников
                        </h4>
                    </div>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="form_group">
                            <label>Fullname*</label>
                            <input type="text"
                                onChange={(e) => setFullname(e.target.value)}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form_group">
                            <label>Username*</label>
                            <input type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form_group">
                            <label>Role*</label>
                            <input type="text"
                                onChange={(e) => setRole(e.target.value)}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form_group">
                            <label>Phone Number*</label>
                            <InputMask
                                type="text"
                                name='phoneNumber'
                                placeholder='Phone Number'
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                mask="+\9\9\8\(99) 999-99-99"
                                maskChar=" "
                                autoComplete="off"
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
           
        </div>
    )
}

export default Worker