import React from "react";



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