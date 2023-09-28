import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import apiRoot from '../../store/apiRoot'
import Chevron from '../../assets/image/svg/Vector.svg';
import ChevronUp from '../../assets/image/svg/VectorUp.svg';
import Profile from '../../assets/image/svg/Group 41.svg';
import LogOut from '../../assets/image/svg/Group 43.svg';
import UserImg from '../../assets/image/admin.jpg';
import './Account.scss'
const Account = () => {
    const token = localStorage.getItem('access_token')
    const ref = useRef()
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        const checkIfClickedOutside = e => {
          // If the menu is open and the clicked target is not within the menu,
          // then close the menu
          if (open && ref.current && !ref.current.contains(e.target)) {
            setOpen(false)
          }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [open])
      const handleClick = () => {
        setOpen(prev => !prev)
      }
    useEffect(()=>{
        apiRoot.get(`auth/users/me`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        },
        ).then(res => {
            if (res.status === 200) {
                setUser(res?.data)
            }
          })
      },[])
    return (
        <div className='account'>
            <div className='account__item' onClick={handleClick} ref={ref}>
                <img className='user_image_upload' src={UserImg} alt="user" />
                <p>{user?.username}</p>
                {
                    open ?
                        <img src={ChevronUp} alt="vector" />
                        : <img src={Chevron} alt="vector" />
                }
                {
                    open ?
                        <div className='account_drop'>
                            <div className="drop_user">
                                <img src={UserImg} alt="image_user" />
                                <h6>{user?.name}</h6>
                            </div>
                            <div className="profile">
                                {
                                    <NavLink to={`profile`}>
                                        <img src={Profile} alt="" />
                                        Профиль
                                    </NavLink>
                                }
                            </div>
                            <div className="log_out" onClick={() => {
                                localStorage.removeItem("token")
                                navigate("/")
                            }}>
                                <img src={LogOut} alt="" />
                                Выход
                            </div>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

export default Account