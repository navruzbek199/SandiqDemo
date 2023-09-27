import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Auth from "../page/Login/_components/Auth/Auth";
import PageNotFound from "../page/404NotFound/404NotFound";
import Update from "../page/Login/_components/Update/Update";
import Madmin from "../role/Madmin/Madmin";
import Main from "../blog/Mblog/Main/Main";
import Warehouses from "../blog/Mblog/Shed/_components/Warehouses/Warehouses";
import Sadmin from "../role/Sadmin/Sadmin";
import Dashboard from "../page/SAdmin/Dashboard/Dashboard";
import Entering from "../page/SAdmin/Entering/Entering";
import Expence from "../page/SAdmin/Expence/Expence";
import Profile from "../page/SAdmin/Profile/Profile";
import ProductItem from "../blog/Mblog/Product/_component/ProductItem/ProductItem";
import Objects from "../blog/Mblog/Building/_components/Objects/Objects";
import Sms from "../blog/Mblog/Sms/Sms";
import SmsHistory from "../blog/Mblog/Sms/_components/SmsHistory";
import Layout from "../components/Layout/Layout";
import Worker from "../blog/Mblog/Worker/Worker";
import System from "../blog/Mblog/System/System";
import Building from "../blog/Mblog/Building/Building";
import Login from "../page/Login/Login";
const RouterPage = () => {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
 
  const error = sessionStorage.getItem("err")

  if (error) {
    return <Routes>
      <Route path='/' element={<PageNotFound />} />
    </Routes>
  }
  if (token === null) {
    return <Routes>
      <Route path='/' element={<Login/>} >
          <Route index path="/login" element={<Auth/>}/>
      <Route path='/' element={<Navigate to={"/login"} />} />
      </Route>
    </Routes>
  }
  return (
    <div>
      {/* <Routes>
        <Route path="/" element={<Login />}>
          <Route index element={<Auth />} />
          {token !== null ? <Route path="update" element={<Update />} /> : null}
        </Route>
        <Route path="/home" element={<Madmin />}>
          <Route index element={<Main />} />
          <Route path="/home/:id" element={<Warehouses />} />
          <Route path="/home/product/:id" element={<ProductItem />} />
          <Route path="/home/objects/:id" element={<Objects />} />
          <Route path="/home/noty/:id" element={<Sms />} />
          <Route path="/home/notyhistory" element={<SmsHistory />} />
        </Route>
        <Route path="/dashboard" element={<Sadmin />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/entring" element={<Entering />} />
          <Route path="/dashboard/expence" element={<Expence />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes> */}



      <Layout>
          <Routes>
                <Route path='worker' element={<Worker/>} />
                <Route path="system" element={<System/>}/>
                <Route path="shed" element={<Warehouses/>}/> 
                <Route path="objects" element={<Objects/>}/>
                <Route path="sms" element={<Sms/>}/> 
                <Route path="building" element={<Building/>}/>
            <Route path='*' element={<Navigate to={"/"}/>}/>
          </Routes>
        </Layout>
    </div>
  );
};

export default RouterPage;
