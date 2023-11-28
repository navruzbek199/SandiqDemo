import React, { useEffect, useRef, useState } from 'react'
import './Shed.scss'
import Add from '../../../assets/image/svg/add.svg';
import { Container } from 'react-bootstrap'
import apiRoot from '../../../store/apiRoot';
import Modal from '../../../components/SuperModal/SuperModal'
import SelectSearch from "react-select-search";
import './SelectSearch.scss'
import Accordion from 'react-bootstrap/Accordion';
import Noty from 'noty'
import EditIcon from '../../../assets/image/svg/edit-text.png'
import TrashIcon from '../../../assets/image/svg/trash-can.png'
import { useNavigate } from 'react-router-dom';
import { HiDotsVertical } from 'react-icons/hi'
const Shed = () => {
  const [open, setOpen] = useState(false)
  const token = localStorage.getItem('access_token')
  const [getShed, setGetShed] = useState()
  const [name, setName] = useState()
  const [address, setAddress] = useState()
  const [options, setOptions] = useState([])
  const [value, setValue] = useState([])
  const [allworker, setAllworker] = useState()
  const [dalete, setDalete] = useState(false)
  const [id, setId] = useState()
  const [edit, setEdit] = useState(false)
  const [changeName, setChangeName] = useState()
  const [changeAddress, setChangeAddress] = useState()
  const [changeValue, setChangeValue] = useState()
  const [click, setClick] = useState(null)
  const navigate = useNavigate()
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
  const GetShed = () => {
    apiRoot.get(`warehouses/list`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setGetShed(res?.data)
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    GetShed()
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
    apiRoot.get(`warehouses/view/${ids}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setChangeName(res?.data?.name)
      setChangeAddress(res?.data?.address)
      setChangeValue(res?.data?.worker?.name)
    })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: name,
      address: address,
      worker: value
    }
    apiRoot.post(`/warehouses/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setOpen(false)
      apiRoot.get(`warehouses/list`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        setGetShed(res?.data)
      }).catch((err) => {
        console.log(err);
      })
    })
  }
  const DeleteTeacher = () => {
    apiRoot.delete(`warehouses/delete/${id}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      },
    ).then(res => {
      setDalete(false)
      apiRoot.get(`warehouses/list`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        setGetShed(res?.data)
      })
      setTimeout(function () {
        new Noty({
          text: "Склад успешно удалён!",
          layout: "topCenter",
          type: "success",
          timeout: 2000
        }).show()
      }, 500)
    })
  }
  const EditShed = (e) => {
    e.preventDefault()
    const data = {
      name: changeName,
      address: changeAddress,
      worker: changeValue
    }
    apiRoot.put(`warehouses/edit/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setEdit(false)
      apiRoot.get(`warehouses/list`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        setGetShed(res?.data)
      }).catch((err) => {
        console.log(err);
      })
    })
  }

  // useEffect(() => {
  //   const checkIfClickedOutside = e => {
  //     if (click && ref.current && !ref.current.contains(e.target)) {
  //       setClick({
  //         bolen: false
  //       })
  //     }
  //   }
  //   document.addEventListener("mousedown", checkIfClickedOutside)
  //   return () => {
  //     document.removeEventListener("mousedown", checkIfClickedOutside)
  //   }
  // }, [click])


  return (
    <>
      <Container fluid='xxl'>
        <div className="teacher_menu">
          <div className="blog__add">
            <button className='add__btn add_teacher' onClick={() => setOpen(true)}>
              <img src={Add} alt="icon_add" />
              Добавить cклад
            </button>
          </div>
        </div>
        <img src="" alt="" />
        <div className="shed_list">
          {getShed?.map((item, index) => (
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
                              id : item?.id,
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
                              id : item?.id,
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
                      <p>Имя cклада:</p>
                      <p className='line'></p>
                      <p>{item?.name}</p>
                    </li>
                    <li>
                      <p>Адрес склада:</p>
                      <p className='line'></p>
                      <p>{item?.address}</p>
                    </li>
                    <li>
                      <p>Имя пользователя:</p>
                      <p className='line'></p>
                      <p>{item?.worker?.name}</p>
                    </li>
                    <li className='form_btn_edit'>
                      <button type='submit' className='in' onClick={() => navigate(`${item?.id}`)}>
                        Войти
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
          {/* {getShed?.map((item, index) => (
            <ul key={item?.id}>
            </ul>
          ))} */}
        </div>
      </Container>
      {open && <Modal set={setOpen} height={450} maxWidth={830} cancel={true}>
        <div className="teacher_add_modal">
          <div className="teacher_modal_name">
            <h4>
              Добавить cклад
            </h4>
          </div>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form_group">
              <label>Имя*</label>
              <input type="text"
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="form_group">
              <label>Адрес*</label>
              <input type="text"
                onChange={(e) => setAddress(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="form_group_select">
              <label>Сотрудника*</label>
              <div className="form_control">
                <SelectSearch
                  options={options}
                  value={value}
                  onChange={setValue}
                  search
                  placeholder="Назначьте сотрудника на этот склад"
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
            <p>Вы действительно хотите удалить этого cклад?</p>
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
              <label>Имя*</label>
              <input type="text"
                onChange={(e) => setChangeName(e.target.value)}
                value={changeName}
                autoComplete="off"
                required
              />
            </div>
            <div className="form_group">
              <label>Адрес*</label>
              <input type="text"
                onChange={(e) => setChangeAddress(e.target.value)}
                value={changeAddress}
                autoComplete="off"
                required
              />
            </div>
            <div className="form_group_select">
              <label>Сотрудника*</label>
              <div className="form_control">
                <SelectSearch
                  options={options}
                  value={changeValue}
                  onChange={setChangeValue}
                  search
                  placeholder="Назначьте сотрудника на этот склад"
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
    </>
  )
}

export default Shed