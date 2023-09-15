import Actions from "../Actions/Actions";
import History from "../History/History";
import Products from "../Products/Products";
const TabItem = ({ tab }) => {
  return (
    <>
      {tab === 1 ? (
        <Products />
      ) : tab === 2 ? (
        <History />
      ) : tab === 0 ? (
        <Actions />
      ) : null}
    </>
  );
};

export default TabItem;
