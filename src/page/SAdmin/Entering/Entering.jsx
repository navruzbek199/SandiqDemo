import React, { useEffect, useState } from "react";
import {} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SelectSearch from "react-select-search";
import apiRoot from "../../../store/apiRoot";
import "./index.scss";
const Entering = () => {
  const token = localStorage.getItem("access_token");
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectValue, setSelectValue] = useState(null);
  const [data, setData] = useState([]);
  const [dataList, setDataList] = useState([]);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryName, setDeliveryName] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");

  const [submitDef, setSubmitDef] = useState(false);

  const currentSize = products.filter((item) => item?.value === selectValue)[0];
  const addProduct = (e) => {
    e.preventDefault();
    if (selectValue && amount.length > 0 && description.length > 0) {
      const newData = {
        product_id: selectValue,
        amount: Number(amount),
        description: description,
        id: Date.now(),
      };
      setData([...data, newData]);
      setSelectValue(null);
      setAmount("");
      setDescription("");
      setOpen((prev) => !prev);
    }
  };

  const onChangeSelect = (value) => {
    setSelectValue(value);
  };
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    const newData = {
      products: data.filter((item) => delete item.id),
      delivery: {
        name: deliveryName,
        phone: deliveryPhone.replace(/[^0-9]/g, ""),
      },
      status: true,
    };
    apiRoot
      .post("/products/sadmin/edit", newData, {
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

  useEffect(() => {
    apiRoot
      .get("/products/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setDataList(res.data);
          let data = res.data.map((item) => {
            return {
              value: item?.id,
              name: item.name,
              size: item.size,
            };
          });
          setProducts(data);
        }
      });
  }, []);

  useEffect(() => {
    if (
      data.length > 0 &&
      deliveryName.length > 0 &&
      deliveryPhone.length === 19
    ) {
      setSubmitDef(true);
    } else {
      setSubmitDef(false);
    }
  }, [deliveryName, deliveryPhone, data]);

  const func = (id, productId) => {
    const list = dataList?.filter((item) => item.id === productId)[0];
    const amount = data?.filter((item) => item.id === id)[0]?.amount;
    return `${list?.name} ${amount} ${list?.size}`;
  };
  const maskNumber = (e) => {
    var x = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
    e.target.value = !x[1]
      ? x[1]
      : "+" +
        x[1] +
        (x[2] ? " (" + x[2] : "") +
        (x[3] ? ") " + x[3] : "") +
        (x[4] ? "-" + x[4] : "") +
        (x[5] ? "-" + x[5] : "");
    setDeliveryPhone(e.target.value);
  };
  return (
    <>
      <section className={`container-entering`}>
        <h4>Omborga kirayotgan maxsulotlar:</h4>
        <div className={"products"}>
          {data?.map((item, index) => (
            <div className={"product"} key={item?.id}>
              {index + 1}. {func(item?.id, item?.product_id)}
            </div>
          ))}
          <button className={"btn"} onClick={() => setOpen((prev) => !prev)}>
            + Maxsulot qo'shish
          </button>
        </div>
        <h4>Maxsulotlarni olib kelgan shaxs:</h4>
        <div className={"form"}>
          <input
            type="text"
            placeholder="Ismi"
            value={deliveryName}
            onChange={(e) => setDeliveryName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Telefon raqami +998 (00) 000-00-00"
            value={deliveryPhone}
            onChange={(e) => maskNumber(e)}
            required
          />
        </div>
        <button
          onClick={submitDef ? onSubmit : null}
          className={submitDef ? "submitBtn" : "submitBtnDef"}
        >
          Saqlash
        </button>
        <Link to={"/dashboard"} className={"back"}>
          Orqaga
        </Link>
      </section>
      <dialog open={open} className={"dialog"}>
        <form onSubmit={addProduct}>
          <div className={"select"}>
            <SelectSearch
              options={products}
              value={selectValue}
              onChange={onChangeSelect}
              search
              placeholder="Maxsulotni tanglang"
            />
          </div>
          {selectValue && (
            <>
              <div className={"size"}>
                <input
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Miqdorni kiriting"
                  required
                />
                <span>{currentSize?.size}</span>
              </div>
              <textarea
                placeholder="Izoh qoldirish"
                rows="5"
                className={"textarea"}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </>
          )}
          <div className={"btns"}>
            <button>+ Qo'shish</button>
            <button type={"button"} onClick={() => setOpen((prev) => !prev)}>
              Orqaga qaytish
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default Entering;
