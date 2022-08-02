import React, { createContext, useState } from 'react'

export const GlobalContext = createContext({})
const GlobalContextProvider = ({children}) => {
  const [message, setMessage] = useState(null)
  const values = {message,setMessage}
  return (
   <GlobalContext.Provider value={values}>
    {children}
   </GlobalContext.Provider>
  )
}

export default GlobalContextProvider