// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import nav1 from "../../assets/image/work/all-inclusive.svg"
// import nav2 from "../../assets/image/work/shield-star-outline.svg"
// import nav3 from "../../assets/image/work/application-brackets-outline.svg"
// import nav4 from "../../assets/image/work/u_bookmark-full.svg"
// import nav5 from "../../assets/image/work/u_parcel.svg"
// import nav6 from "../../assets/image/work/u_university.svg"
// import nav7 from "../../assets/image/work/u_voicemail.svg"
// import navExit from "../../assets/image/work/u_exit.svg"
// import Logo from '../../assets/image/sandiq_logo.svg'
// import './Sidebar.scss'
// const Sidebar = ({setOpen,drawer,setDrawer}) => {
//     const handleId = (id) => {
//         setOpen(id)
//     }
//     const ExitLink = () => {
//         localStorage.removeItem("access_token")
//         window.location.reload()
//     }
//     return (
//         <div className='sidebar'>
//             <nav>
//                 <div className="title">
//                     {drawer && <img className='logo' src={Logo} />}
//                 </div>
//                 <ul className='side_menu'>
//                     <li>
//                         <NavLink to={'/system'} onClick={() => handleId("monitoring")}>
//                             <img src={nav1} alt="icon" />
//                             {drawer && "monitoring"}
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to={'/shed'} onClick={() => handleId("shed")}>
//                             <img src={nav2} alt="icon" />
//                             {drawer && "shed"}

//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to={'/object'} onClick={() => handleId("object")}>
//                             <img src={nav3} alt="icon" />
//                             {drawer && "object"}
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to={"/products"} onClick={() => handleId()}>
//                             <img src={nav4} alt="icon" />
//                             {drawer && "products"}
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to={"/worker"} onClick={() => handleId()}>
//                             <img src={nav5} alt="icon" />
//                             {drawer && "worker"}
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to={"/sms"} onClick={() => handleId()}>
//                             <img src={nav6} alt="icon" />
//                             {drawer && "sms"}
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to={"/building"} onClick={() => handleId()}>
//                             <img src={nav7} alt="icon" />
//                             {drawer && "building"}
//                         </NavLink>
//                     </li>
//                 </ul>
//                 <ul className='logout_menu'>
//                     <li onClick={ExitLink}>
//                         <a href="#">
//                             <img src={navExit} alt="icon" />
//                             {drawer && "LogOut"}
//                         </a>
//                     </li>
//                 </ul>
//                 <ul className='text_power'>
//                     {drawer ? <li>@Powered by <span>Astrolab</span></li> : null}
//                 </ul>
//             </nav>
//         </div>
//     )
// }

// export default Sidebar