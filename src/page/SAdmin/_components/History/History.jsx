import React, { useEffect, useState } from "react";
import apiRoot from "../../../../store/apiRoot";
import style from "./index.module.scss";
import Income from "../../../../assets/image/png/arrow-top.png";
import Outgo from "../../../../assets/image/png/arrow-bottom.png";
import gif from "../../../../assets/image/box.gif";

const History = () => {
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
          setHistory(res.data.reverse());
        }
      });
  }, []);
  return (
    <div className={style.historyContainer}>
      {history?.length === 0 ? (
        <div className={style.gif}>
          <img src={gif} alt="" />
          <h4> O'zgarishlar tarixi bo'sh !</h4>
          <p> Barcha o'zgarishlar shu yerda ko'rinadi.</p>
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

export default History;
