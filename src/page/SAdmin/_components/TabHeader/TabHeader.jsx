import React from "react";
import style from "./index.module.scss";

const TabHeader = ({ tab, setTab }) => {
  return (
    <div className={style.tabs}>
      <div
        className={`${style.tabItem} ${tab === 0 && style.tabItemActive}`}
        onClick={() => setTab(0)}
      >
        Ombor
      </div>
      <div
        className={`${style.tabItem} ${tab === 1 && style.tabItemActive}`}
        onClick={() => setTab(1)}
      >
        Maxsulotlar
      </div>

      <div
        className={`${style.tabItem} ${tab === 2 && style.tabItemActive}`}
        onClick={() => setTab(2)}
      >
        O'zgarishlar tarixi
      </div>
    </div>
  );
};

export default TabHeader;
