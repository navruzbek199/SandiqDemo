import React, { useContext, useEffect, useState } from "react";
import "./Sms.scss";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import apiRoot from "../../../store/apiRoot";
import { Col, Container, Row } from "react-bootstrap";
import ArrowLeft from "../../../assets/image/svg/arrow-left.png";
import SmsItem from "./_components/SmsItem";
import { GlobalContex } from "../../../store/Contex";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Noty from "noty";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
const Sms = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyAn6jwHRcrs57ayqyz_T7b_qRFHe1rSJ7I",
    authDomain: "sandiq-3aada.firebaseapp.com",
    projectId: "sandiq-3aada",
    storageBucket: "sandiq-3aada.appspot.com",
    messagingSenderId: "145470829167",
    appId: "1:145470829167:web:d947c2a0f88e2f3054939a",
  });
  const firestore = firebase.firestore();
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );

  const navigate = useNavigate();
  const { id } = useParams();
  const { search } = useLocation();
  const token = localStorage.getItem("access_token");
  const [sms, setSms] = useState();
  useEffect(() => {
    apiRoot
      .get(`bid/view/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSms(res?.data);
        console.log(res?.data, "sms his");
      });
  }, [id, search]);
  const time = (str) => {
    const newTime = new Date(str);
    return newTime.toLocaleTimeString() + " " + newTime.toLocaleDateString();
  };
  const newSms = async (role, noty_id) => {
    firestore.collection("messages").add({
      uid: Date.now(),
      displayName: "admin",
      role_to: role,
      status: true,
      bid_id: noty_id,
      object_id: sms?.object_id,
      createdAt: String(new Date()),
    });
  };
  const { data } = useContext(GlobalContex);
  const onSend = () => {
    const newdata = {
      object_id: sms?.object_id,
      bid_id: Number(id),
      products: data,
    };
    apiRoot
      .post(`bid/warehouse/to`, newdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        newSms("s_admin", res?.data);
        firestore?.collection("messages")?.add({
          uid: Date.now(),
          displayName: "admin",
          role_to: "Prorap",
          status: true,
          bid_id: res?.data,
          object_id: sms?.object_id,
          success: true,
          createdAt: String(new Date()),
        });
        if (res?.data?.status === "success") {
          navigate("/home/notyhistory");
        }
        setTimeout(function () {
          new Noty({
            text: "Malumotlar junatildi!",
            layout: "topRight",
            type: "success",
            timeout: 2000,
          }).show();
        }, 1000);
        console.log(res?.data, "send sms");
      });
  };
  const onCancel = () => {
    apiRoot
      .get(`bid/cancel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        firestore.collection("messages").add({
          uid: Date.now(),
          displayName: "admin",
          role_to: "Prorap",
          status: true,
          bid_id: Number(id),
          cancel: true,
          object_id: sms?.object_id,
          createdAt: String(new Date()),
        });
        setTimeout(function () {
          new Noty({
            text: "Malumotlar bekor qilindi!",
            layout: "topRight",
            type: "error",
            timeout: 2000,
          }).show();
        }, 1000);
        navigate("/home/notyhistory");
      });
  };

  return (
    <div className="sms">
      <div className="blog_header">
        <Container fluid="xxl">
          <div className="blog">
            <div className="className_title">
              <Link to="/home">
                <BsFillArrowLeftSquareFill
                  size={32}
                  color="#00827B"
                  style={{ marginRight: "12px" }}
                />
                <div className="title">
                  <h4>Заявка</h4>
                  <h2>{time(sms?.created_at)}</h2>
                </div>
              </Link>
              <div className="title">
                <p>
                  Название объекта: <span>{sms?.object}</span>
                </p>
                <p>
                  Имя: <span>{sms?.worker}</span>
                </p>
                <p>
                  Телефон: <span>+{sms?.phone}</span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <Row>
          <div className="tab_content">
            <div className="teacher_page mt-4">
              <table variant="#F3F6FA">
                <thead className="table__head">
                  <tr>
                    <th col-md-1>№</th>
                    <th col-md-2>Название</th>
                    <th col-md-2>Количество</th>
                    {/* <th col-md-1>Название объекта</th>
                                        <th col-md-2>Имя</th>
                                        <th col-md-2>Телефон</th> */}
                    <th col-md-2>Имя cклада</th>
                    <th col-md-2>Junatiladigan Mahsulot soni</th>
                  </tr>
                </thead>
                <tbody className="table__body">
                  {sms?.products?.map((item, index) => (
                    <SmsItem item={item} index={index} key={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Col md="6">
            <div className="description">
              <div className="des_head">
                <h6>Описание</h6>
              </div>
              <div className="des_body">
                <p>{sms?.description}</p>
              </div>
            </div>
          </Col>
          <Col md={{ span: 5, offset: 1 }}>
            {sms?.status === "yuborilgan" ? (
              <div className="send_btn gap-4">
                <button className="send" onClick={onSend}>
                  Отправить
                </button>
                <button className="cancel" onClick={onCancel}>
                  Oтменить заявка
                </button>
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sms;
