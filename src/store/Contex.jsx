import React from "react";
import { useLocation } from "react-router-dom";



export const GlobalContex = React.createContext()


const Contex = ({children}) => {

    let data = []

    const state = {
        data,
    }

  return (
  <>
  <GlobalContex.Provider value={state}>
{children}
  </GlobalContex.Provider>
  </>
  )
}

export default Contex