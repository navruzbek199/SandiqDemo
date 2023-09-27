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
      <div className="right__edit">
        <div className="loginedit_form">
          <form onSubmit={onSubmit}>
            <div className="form__text">
                <h4>Изменение профиля</h4>
            </div>
            <div className="form_item">
              <label htmlFor="fullname">
                ФИО
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="Fullname"
                required
                value={newFullname}
                onChange={(e) => setNewFullname(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="form_item">
              <label htmlFor="phone_number">
                Телефон
              </label>
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
            </div>
            <div className="form_item">
              <label htmlFor="username">
                Логин
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={newFio}
                onChange={(e) => setNewFio(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="form_item">
              <label htmlFor="password">
                Новый пароль
              </label>
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
              <div className="eye_btns1" onClick={toggleBtn1}>
                {states1 ? (
                  <img src={eye_btn} alt="eye" />
                ) : (
                  <img src={noeye_btn} alt="eye" />
                )}
              </div>
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
