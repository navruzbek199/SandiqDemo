import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRoot from "../../../store/apiRoot";
import style from "./index.module.scss";
const Profile = () => {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [data, setData] = useState({
    name: "",
    address: "",
  });
  useEffect(() => {
    apiRoot
      .get("/auth/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setName(res.data.name);
          setPhone(res.data.phone);
          setUsername(res.data.username);
          setData({
            name: res.data.warehouse.name,
            address: res.data.warehouse.address,
          });
        }
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      phone: phone,
      password: password,
      username: username,
    };
    apiRoot
      .post("/auth/users/first/edit", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          navigate("/dashboard");
        }
      });
  };
  return (
    <div className={style.profile}>
      <h5>Ombor ma'lumoti:</h5>
      <p>
        <b>Nomi: </b>
        {data.name}
      </p>
      <p>
        <b>Manzili:</b> {data.address}
      </p>
      <br />
      <h5>Shaxsiy ma'lumot:</h5>
      <form className={style.form} onSubmit={onSubmit}>
        <label htmlFor="name">Ism</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="phone">Telefon raqam</label>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <label htmlFor="username">Foydalanuvchi nomi</label>
        <input
          type="text"
          name="phusernameone"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Parol</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={style.submitBtn}>Saqlash</button>
        <Link to={"/dashboard"} className={style.back}>
          Orqaga
        </Link>
      </form>
    </div>
  );
};

export default Profile;
