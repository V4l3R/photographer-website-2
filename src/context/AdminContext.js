import React, { useState, useEffect, createContext } from 'react';

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {

  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
  const [adminUsername, setAdminUsername] = useState(localStorage.getItem("adminUsername"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

    function handleSetIsAdmin(value) {
      setIsAdmin(value)
      localStorage.setItem("isAdmin", value)
    }

    function handleSetAdminUsername(value) {
      setAdminUsername(value)
      localStorage.setItem("adminUsername", value)
    }

    function handleSetAccessToken(value) {
      setAccessToken(value)
      localStorage.setItem("accessToken", value)
    }


  return (
    <AdminContext.Provider value={{ isAdmin, handleSetIsAdmin, adminUsername, handleSetAdminUsername, accessToken, handleSetAccessToken }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
