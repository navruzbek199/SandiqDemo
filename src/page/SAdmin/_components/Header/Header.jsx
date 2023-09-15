import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import edit from "../../../../assets/image/png/edit.png";
import logout from "../../../../assets/image/png/sign-out.png";
import apiRoot from "../../../../store/apiRoot";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const token = localStorage.getItem("access_token");
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const logOut = () => {
    navigate("/");
    localStorage.clear();
  };
  useEffect(() => {
    apiRoot
      .get("/auth/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      });
  }, []);
  return (
    <header className={style.header}>
      <p className={style.name}>{data?.name}</p>
      <div className={style.setting}>
        <p>{data?.warehouse?.name}</p>
        <div>
          <img
            src={logout}
            alt=""
            style={{ padding: "10px", marginRight: "10px" }}
            onClick={logOut}
          />
          <Link to={"/dashboard/profile"}>
            <img src={edit} alt="" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
