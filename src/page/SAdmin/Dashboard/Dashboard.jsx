import React, { useState } from "react";
import Header from "../_components/Header/Header";
import TabHeader from "../_components/TabHeader/TabHeader";
import TabItem from "../_components/TabItem/TabItem";
import style from "./index.module.scss";
const Dashboard = () => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Header />
      <section className={style.dashboard}>
        <TabHeader setTab={setTab} tab={tab} />
        <TabItem tab={tab} />
      </section>
    </>
  );
};

export default Dashboard;
