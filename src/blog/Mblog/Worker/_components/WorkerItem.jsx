import React, { useEffect, useState } from 'react'
import Lock from '../../../../assets/image/svg/lock.svg';
import Edit from "../../../../assets/image/svg/edit.svg";
import apiRoot from '../../../../store/apiRoot';
import Modal from '../../../../components/SuperModal/SuperModal'
import InputMask from 'react-input-mask'
import Noty from 'noty'
const WorkerItem = ({ index, item, setAllworker }) => {
    const [getIdWorker, setGetIdWorker] = useState()
    const [code, setCode] = useState(false)
    const [showNumber, setShowNumber] = useState(false)
    const [codeGet, setCodeGet] = useState()
    const [loading, setLoading] = useState(null)
    const [changeName, setChangeName] = useState()
    const [changeUserName, setChangeUserName] = useState()
    const [changePhone, setChangePhone] = useState()
    const [edit, setEdit] = useState(false)
    const [ids, setIds] = useState()
    const [dalete, setDalete] = useState(false)
    const [changeRole, setChangeRole] = useState()
    const token = localStorage.getItem('access_token')
    const GetIdWorker = (id) => {
        apiRoot.get(`workers/view/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setGetIdWorker(res?.data)
            setIds(res?.data?.id)
            setChangeName(res?.data?.name)
            setChangeUserName(res?.data?.username)
            setChangePhone(res?.data?.phone)
            setChangeRole(res?.data?.role)
        })
    }

    const GetCode = (id) => {
        setLoading(true)
        apiRoot.get(`workers/generate-password/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setLoading(false)
            setCodeGet(res?.data)
        })
        setShowNumber(!showNumber)
        // setCodeGet(!codeGet)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: changeName,
            username: changeUserName,
            role: changeRole,
            phone: changePhone?.replace(/[^0-9]/g, "")
        }
        apiRoot.put(`workers/edit/${ids}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res?.data);
            setEdit(false)
            apiRoot.get(`workers/list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setAllworker(res.data)

            })

        }).catch((err) => {
            console.log(err);
        })
    }

    const DeleteTeacher = (ids) => {
        apiRoot.delete(`workers/delete/${ids}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          },
        ).then(res => {
          console.log(res?.data, "bu delete")
            setDalete(false)
            apiRoot.get(`workers/list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setAllworker(res.data)
            })
            setTimeout(function () {
              new Noty({
                text: "Сотрудник успешно удалён!",
                layout: "topCenter",
                type: "success",
                timeout: 2000
              }).show()
            }, 500)
        })
      }


    return (
        <>
            <tr key={item.id}>
                <td col-md-1>{index + 1}</td>
                <td col-md-2>{item?.name} </td>
                <td col-md-1>{item?.username}</td>
                <td col-md-1>
                    <div className={item?.role === "s_admin" ? "type_1" : item?.role === "Prorap" ? "type_2" : item?.role === "expeditor" ? "type_3" : item?.role === "Kasser" ? "type_4" : item?.role === "arxitektor" ? "type_5" : item?.role === "driver" ? "type_6" : null}>
                        {item?.role}
                    </div>
                </td>
                <td col-md-1>
                    <div className="">
                        +{item?.phone}
                    </div>
                </td>
                <td col-md-1>{item?.warehouse?.name ? item?.warehouse?.name : item?.object?.name}</td>
                <td col-md-1>{item?.warehouse?.address ? item?.warehouse?.address : item?.object?.address}</td>
                <td col-md-1 className='table_code'
                    onClick={() => {
                        GetIdWorker(item?.id)
                        setCode(true)
                    }}>
                    <img src={Lock} alt="codeImg" />
                </td>
                <td col-md-1 className='table_edit'
                    onClick={() => {
                        GetIdWorker(item?.id)
                        setEdit(true)
                    }}>
                    <img src={Edit} alt="editImage" />
                </td>
            </tr>
            {code && <Modal set={setCode} height={400} cancel={false} maxWidth={530} >
                <div className="code_send">
                    <div className="code_title">
                        <h4>{getIdWorker?.name}</h4>
                    </div>
                    <div className="code_about">
                        <p>В случае, если cотрудник забыл свой пароль,вы можете передать ему новый, предварительно сбросив старый
                        </p>
                    </div>
                    <div className="form_code">
                        <div className="login_code">
                            <p>Username</p>
                            <span>{getIdWorker?.username}</span>
                        </div>
                        <div className="login_code">
                            <p>Password</p>
                            {
                                showNumber ? (loading ? <p>loading...</p> : <p>{codeGet?.password}</p>) : <button onClick={() => GetCode(getIdWorker?.id)}>Временный пароль</button>
                            }
                        </div>
                    </div>
                    <div className='code_btn'>
                        <button onClick={() => {
                            setShowNumber(!showNumber)
                            setCode(false)
                        }} className="save">Сохранить</button>
                    </div>
                </div>
            </Modal>}
            {edit && <Modal set={setEdit} height={480} maxWidth={830} cancel={true}>
                <div className="teacher_add_modal">
                    <div className="teacher_modal_name">
                        <h4>
                            Редактировать
                        </h4>
                    </div>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="form_group">
                            <label>Fullname*</label>
                            <input type="text"
                                onChange={(e) => setChangeName(e.target.value)}
                                value={changeName}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form_group">
                            <label>Username*</label>
                            <input type="text"
                                onChange={(e) => setChangeUserName(e.target.value)}
                                value={changeUserName}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form_group">
                            <label>Role*</label>
                            <input type="text"
                                onChange={(e) => setChangeRole(e.target.value)}
                                value={changeRole}
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
                                onChange={(e) => setChangePhone(e.target.value)}
                                value={changePhone}
                                required
                                mask="+\9\9\8\(99) 999-99-99"
                                maskChar=" "
                                autoComplete="off"
                            />
                        </div>
                        <div className="form_btn_edit">
                            <button type='submit' className='delete' onClick={() => setDalete(true)}>
                                Удалить
                            </button>
                            <button type='submit' className='save'>
                                Сохранить
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            }
            {dalete && <Modal set={setDalete} height={370} maxWidth={530} cancel={false}>
                <div className="delete_teacher">
                    <div className="delete_title">
                        <h4>Удалить</h4>
                    </div>
                    <div className="delete_text">
                        <p>Вы действительно хотите удалить этого cотрудник?</p>
                    </div>
                    <div className="delete_btn gap-2">
                        <button className='cancel' onClick={() => setDalete(false)}>Отменить</button>
                        <button onClick={()=>DeleteTeacher(ids)}>Удалить</button>
                    </div>
                </div>
            </Modal>}
        </>
    )
}

export default WorkerItem