import { useEffect, useState } from "react";
import RouterPage from "./store/RouterPage";

function App() {
  // requestForToken();
  

  // onMessageListener()
  //   .then((payload) => {
  //     setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
  //   })
  //   .catch((err) => console.log('failed: ', err));

  return (
    <div className="App">
      <RouterPage />
    </div>
  );
}

export default App;
