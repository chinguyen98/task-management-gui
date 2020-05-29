import React, { createContext, useState, useEffect } from 'react';
import { decodeToken } from '../services/auth.service';

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(decodeToken());
  }, [])

  const contextValue = {
    user,
    setUser,
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;