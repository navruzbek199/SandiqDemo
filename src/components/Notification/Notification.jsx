import React, { useEffect, useRef, useState } from 'react'
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import { IoIosNotifications } from 'react-icons/io'
import './Notification.scss'
import { Link } from 'react-router-dom';
const Notification = () => {
    firebase.initializeApp({
        apiKey: "AIzaSyAweODwWAa3klYmgJLjNoBL9cvTJDn8BLI",
        authDomain: "e-work-9007c.firebaseapp.com",
        projectId: "e-work-9007c",
        storageBucket: "e-work-9007c.appspot.com",
        messagingSenderId: "626928554871",
        appId: "1:626928554871:web:0de76fb140d232bd278772",
        measurementId: "G-Y0RY9TZVLZ"
    });
    const firestore = firebase.firestore()
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(true)
    const ref = useRef()
    const [messages, loading] = useCollectionData(
        firestore.collection("messages").orderBy("createdAt")
    )
    const token = localStorage.getItem('access_token')
    const readingSms = localStorage.getItem('lastSms')
    const filterData = messages?.filter((item) => item?.role_to === "admin").filter((item) => !readingSms?.includes(item.uid))
    useEffect(() => {
        if(filterData?.length > 0){
            setActive(false)
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
        if(filterData.length > 0) {
            setOpen(prev => !prev)
        }
    }
    // const newSms = async () => {
    //     firestore.collection("messages").add({
    //         uid: Date.now(),
    //         displayName: "Admin",
    //         text: newMessage,
    //         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //     });
    //     setNewMessage("");
    // }
    const time  = (str) => {
        const newTime = new Date(str)
        return newTime.toLocaleTimeString()
    }
    
    console.log(filterData,"oqilmagan smslar");
    return (
        <div className='notification'>
            <div className='notification_icon' onClick={handleClick}>
                <IoIosNotifications size={22} color='#fff' />  
                <div hidden={active}>
                </div> 
            </div>
            {
                open ?
                    <div className='account_drop'>
                        <div className="drop_user">
                            {filterData?.map((item) => (
                                <Link to={`noty/${item?.bid_id}/?${item?.uid}`} onClick={() => {
                                    setOpen(false) 
                                    // NotificationId(item?.bid_id)
                                    }}>
                                    <p>{item?.object_name}</p>
                                    <span>{time(item?.createdAt)}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}



export default Notification