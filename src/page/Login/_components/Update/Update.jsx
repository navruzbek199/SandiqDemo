import React, { useEffect, useState } from "react";
import "./Update.scss";
import LogEdit from "../../../../assets/image/png/perspective_matte 1.png";
import eye_btn from "../../../../assets/image/svg/eye.svg";
import noeye_btn from "../../../../assets/image/svg/eye-slash.svg";
import Modal from "../../../../components/SuperModal/SuperModal";
import ModalImage2 from "../../../../assets/image/png/perspective_matte 2 1.png";
import { Link, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import Noty from "noty";
import apiRoot from "../../../../store/apiRoot";
const Update = () => {
  const token = localStorage.getItem("access_token");
  const [states1, setStates1] = useState(false);
  const [states2, setStates2] = useState(false);
  const [click, setClick] = useState(false);
  const [allValue, setAllValue] = useState({});
  const [newFio, setNewFio] = useState("");
  const [newFullname, setNewFullname] = useState("");
  const [newphoneNumber, setNewphoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorInput, setErrorInput] = useState(false);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  const toggleBtn1 = () => {
    setStates1((prev) => !prev);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: newFio,
      name: newFullname,
      phone: newphoneNumber?.replace(/[^0-9]/g, ""),
      password: newPassword,
    };
    apiRoot
      .post(`auth/users/first/edit`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res?.data, "data success");
        if (res?.data?.role === "m_admin") {
          navigate("/home");
        } else {
          navigate("/");
        }
      });
  };

  useEffect(() => {
    apiRoot
      .get("auth/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfile(res?.data);
        setNewFio(res?.data?.username);
        setNewFullname(res?.data?.name);
        setNewphoneNumber(res?.data?.phone);
        console.log(res?.data, "res Data");
      });
  }, []);

  return (
    <div className="login__edit">
      <div className="left__edit">
        <div className="title">
          <p>
            В целях безопасности рекомендуем вам придумать для себя новый логин
            и пароль.
          </p>
        </div>
        <div className="photos">
          <img src={LogEdit} alt="warning" />
        </div>
        <div className="text">
          {/* <p>Siz ushbu bosqichni o‘tkazib yuborishingiz va <br />
                        akkaunt sozlamalarida login/parolni o‘zgartirishingiz mumkin.
                    </p> */}
        </div>
      </div>
      <div className="line"></div>
      <div className="right__edit">
        <div className="loginedit_form">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={newFio}
              onChange={(e) => setNewFio(e.target.value)}
              autoComplete="off"
            />
            <input
              type="text"
              name="fullname"
              placeholder="Fullname"
              required
              value={newFullname}
              onChange={(e) => setNewFullname(e.target.value)}
              autoComplete="off"
            />
            <InputMask
              type="text"
              name="phone_number"
              placeholder="Phone number"
              value={newphoneNumber}
              onChange={(e) => setNewphoneNumber(e.target.value)}
              required
              className={errorInput ? "error" : null}
              mask="+\9\9\8\(99) 999-99-99"
              maskChar=" "
              autoComplete="off"
            />
            <input
              type={states1 ? "text" : "password"}
              name="password"
              placeholder="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="off"
              minLength={8}
              maxLength={14}
              required
            />
            {/* <div onClick={() => setClick(true)} className="answer_modal">
              ?
            </div>
            {click && (
              <Modal set={setClick} height={297}>
                <div className="item__photoss">
                  <img src={ModalImage2} alt="" />
                </div>
                <div className="item__tetxt">
                  <p>empty</p>
                </div>
              </Modal>
            )} */}
            <div className="eye_btns1" onClick={toggleBtn1}>
              {states1 ? (
                <img src={eye_btn} alt="eye" />
              ) : (
                <img src={noeye_btn} alt="eye" />
              )}
            </div>
            <button
              className={
                newPassword.length > 8
                  ? "loginedit_btn active"
                  : "loginedit_btn disabled"
              }
            >
              Далее
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
