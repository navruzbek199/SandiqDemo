import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
const Layout = ({children}) => {
    const [open,setOpen] = useState('Statistika')
    const [drawer,setDrawer] = useState(true)
    return (
        <div className='layout_page d-flex'  style={{ backgroundColor: "#fff"}}>
            <Sidebar setOpen={setOpen} drawer={drawer} setDrawer={setDrawer} />
            <div style={{ width: "80%" , position: "relative" }}>
                <Header title={open} />
                {children}
            </div>
        </div>
    )
}

export default Layout