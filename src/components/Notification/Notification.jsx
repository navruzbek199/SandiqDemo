import React, { useEffect, useRef, useState } from 'react'
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import { IoIosNotifications } from 'react-icons/io'
import './Notification.scss'
import { Link } from 'react-router-dom';
import Gif from '../../assets/image/box.gif'
import Noty from 'noty'
const Notification = () => {
    firebase.initializeApp({
        apiKey: "AIzaSyDz6FBBmMMGM3NUUqOh4qWHthx1H8j9Scc",
        authDomain: "sandiq-e9271.firebaseapp.com",
        projectId: "sandiq-e9271",
        storageBucket: "sandiq-e9271.appspot.com",
        messagingSenderId: "15875332214",
        appId: "1:15875332214:web:3eee64e28baf3c0953a757"
    });
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(true)
    const ref = useRef()
    const firestore = firebase.firestore()
    const [messages, loading] = useCollectionData(
        firestore.collection("messages").orderBy("createdAt")
    )
    const token = localStorage.getItem('access_token')
    const readingSms = localStorage.getItem('lastSms')
    const filterData = messages?.filter((item) => item?.role_to === "admin").filter((item) => item?.status === true)
    const onUpdate = (uid) => {
        firestore.collection("messages").where("uid", "==", uid)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.update({status: false})
            });
       })
      };
    useEffect(() => {
        if(filterData?.length > 0){
            setActive(false)
            if(filterData?.status){
                setTimeout(function () {
                    new Noty({
                      text: "Новое сообщение",
                      layout: "topRight",
                      type: "success",
                      timeout: 2000,
                    }).show();
                  }, 1000);
            }
        }else{
            setActive(true)
        }
        
    }, [messages, window.location])
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (open && ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [open])
    const handleClick = () => {
        setOpen(prev => !prev)
    }
    
    const time  = (str) => {
        const newTime = new Date(str)
        return newTime.toLocaleTimeString()
    }
    
    return (
        <div className='notification'>
            {localStorage?.getItem("role") !== "arxitektor" ? 
                <div className='notification_icon' onClick={handleClick}>
                    <IoIosNotifications size={22} color='#fff' />  
                    <div hidden={active}>
                    </div> 
                </div>
                : null
            }
            {
                open ?
                    <div className='account_drop'>
                        <div className="drop_user">
                            {filterData?.length > 0 ? filterData?.map((item) => (
                                <Link to={`noty/${item?.bid_id}/?${item?.uid}`} onClick={() => {
                                    setOpen(false) 
                                    onUpdate(item?.uid)
                                    // onUpdate(() => item?.uid)
                                    // NotificationId(item?.bid_id)
                                    }}>
                                    <p>{item?.object_name}</p>
                                    <span>{time(item?.createdAt)}</span>
                                </Link>
                            )) : 
                            <div className='gif'>
                                <img src={Gif} alt="gif" />
                            </div>
                            }
                            <Link to={`notyhistory`} className='link_history' onClick={()=> setOpen(false)}>
                                Список запросов
                            </Link>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}



export default Notification