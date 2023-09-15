import React, { useState } from "react";
import eye_btn from "../../../../assets/image/svg/eye.svg";
import noeye_btn from "../../../../assets/image/svg/eye-slash.svg";
import Modal from "../../../../components/SuperModal/SuperModal";
import { NavLink, useNavigate } from "react-router-dom";
import modalImg from "../../../../assets/image/png/Graduation cap and diploma with seal 3D icon 1.png";
import InputMask from "react-input-mask";
import "./Auth.scss";
import Noty from "noty";
import apiRoot from "../../../../store/apiRoot";
const Auth = () => {
  const [states, setStates] = useState(false);
  const [open, setOpen] = useState(false);
  const [activBtn, setActiveBtn] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const num = (e) => {
    setNumber(e.target.value);
    setActiveBtn(true);
  };
  const toggleBtn = () => {
    setStates((prev) => !prev);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: number,
      password: password,
    };
    apiRoot
      .post(`auth/login`, data)
      .then((res) => {
        if (res?.status === 200) {
          localStorage.setItem("access_token", res?.data?.token);
          localStorage.setItem("role", res?.data?.role);
          if (res?.data?.role === "m_admin") {
            if (res?.data?.status === true) {
              navigate("home");
            } else {
              navigate("update");
            }
          }
          if (res?.data?.role === "s_admin") {
            if (res?.data?.status === true) {
              navigate("dashboard");
            } else {
              navigate("update");
            }
          }
        }
      })
      .catch((err) => {
        console.log(err?.response);
        setErrorInput(true);
        setTimeout(function () {
          new Noty({
            text: "Iltimos malumotlarni togri kiriting !",
            layout: "topRight",
            type: "error",
            timeout: 2000,
          }).show();
        }, 1000);
      });
  };
  return (
    <div>
      <form className="login_page__form" onSubmit={onSubmit}>
        <div className="form__title">
          <h4>Вход</h4>
          <div>?</div>
        </div>
        {/* {open && (
          <Modal set={setOpen} height={370}>
            <div className="item__photos">
              <img src={modalImg} alt="" />
            </div>
            <div className="item__tetxt">
              <p>"salom"</p>
              <p>"salom"</p>
            </div>
          </Modal>
        )} */}
        <InputMask
          type="text"
          name="username"
          placeholder="username"
          required
          className={errorInput ? "error" : null}
          autoComplete="off"
          onChange={(e) => num(e)}
        />
        <div className="input">
          <input
            type={states ? "text" : "password"}
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className={errorInput ? "error" : null}
            autoComplete="off"
          />
          <div className="eye_btn" onClick={toggleBtn}>
            {states ? (
              <img src={eye_btn} alt="eye" />
            ) : (
              <img src={noeye_btn} alt="eye" />
            )}
          </div>
        </div>
        <button
          type="submit"
          className={activBtn ? "form_btn active" : "form_btn"}
        >
          Далее
        </button>

        <div className="form__text">
          <NavLink to="/login/loginRestore">
            Не помните логин или пароль?
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Auth;
