import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { Outlet } from 'react-router-dom'
const Arxitektor = () => {
    return (
        <>
            <Header />
                <div style={{ backgroundColor: '#F3F6FA' }}>
                    <Outlet />
                </div>
            <Footer />
        </>
    )
}

export default Arxitektor