import React, { useEffect, useState } from "react";
import apiRoot from "../../../../store/apiRoot";
import style from "./index.module.scss";
import gif from "../../../../assets/image/box.gif";
const Products = () => {
  const token = localStorage.getItem("access_token");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(null);

  const filterData =
    search?.length > 0
      ? products?.filter((item) => item?.name.toLowerCase().includes(search))
      : products;

  useEffect(() => {
    apiRoot
      .get("/products/sadmin/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setProducts(res?.data);
        }
      });
  }, []);
  return (
    <div className={style.tabElement}>
      <div className={style.form}>
        <input
          type="search"
          placeholder="Tovarni izlash..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filterData?.length === 0 ? (
        <div className={style.gif}>
          <img src={gif} alt="" />
          <h4> Omborda maxsulot mavjud emas !</h4>
          <p> Qo'shilgan maxsulotlar shu yerda ko'rinadi.</p>
        </div>
      ) : (
        <div className={style.products}>
          {filterData?.map((item, index) => (
            <div className={style.card} key={item.id}>
              <div>
                {index + 1}. {item.name}
              </div>
              <div>
                {item.amount} {item.size}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
