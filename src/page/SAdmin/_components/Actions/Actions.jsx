import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRoot from "../../../../store/apiRoot";
import style from "./index.module.scss";
import Income from "../../../../assets/image/png/arrow-top.png";
import Outgo from "../../../../assets/image/png/arrow-bottom.png";
import truck from "../../../../assets/image/png/truck.png";
import warehouse from "../../../../assets/image/png/warehouse.png";
import gif from "../../../../assets/image/box.gif";

const Actions = () => {
  const token = localStorage.getItem("access_token");
  const [history, setHistory] = useState(null);
  useEffect(() => {
    apiRoot
      .get("/products/sadmin/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setHistory(res.data.reverse().filter((_, index) => index < 5));
        }
      });
  }, []);
  return (
    <div className={style.actions}>
      <div className={style.actionsBtn}>
        <Link to={"/dashboard/entring"}>
          <div className={style.icon} style={{ backgroundColor: "#008700" }}>
            <img src={warehouse} alt="" />
          </div>
          <p className={style.title}>Omborga qo'shish</p>
        </Link>
        <Link to={"/dashboard/expence"}>
          <div className={style.icon} style={{ backgroundColor: "#fa0000" }}>
            <img src={truck} alt="" />
          </div>
          <p className={style.title}>Ombordan chiqarish</p>
        </Link>
      </div>
      <h4>So'ngi o'zgarishlar tarixi</h4>
      {history?.length === 0 ? (
        <div className={style.gif}>
          <img src={gif} alt="" />
          <h4> So'ngi o'zgarishlar tarixi bo'sh !</h4>
          <p> So'ngi o'zgarishlar shu yerda ko'rinadi.</p>
        </div>
      ) : (
        history?.map((item, index) => (
          <div className={`${style.container}`} key={item?.id}>
            <div className={style.title}>
              <p>{index + 1}.</p>
              <p>{item.name}</p>
            </div>
            <div className={style.icon}>
              <img src={item.status ? Income : Outgo} alt="" />
              <p style={{ color: item.status ? "#008700" : "#fa0000" }}>
                {item.amount} {item.size}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Actions;
