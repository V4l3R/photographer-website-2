import React, { useState, useEffect, createContext } from 'react';

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // if (!mobileViewportIsActive) {
    //   const move = (e) => {
    //     setCursorPos({
    //       x: e.clientX,
    //       y: e.clientY,
    //     })
    //   }
    //   // window.addEventListener('mousemove', move);
      
    //   return () => {
    //     // window.removeEventListener('mousemove', move)
    //   }
    // } else {
    //   // setCursorBG('disappear');
    // }
    });

  const cursorVariants = {
    default: {
      // x: cursorPos.x - 16,
      // y: cursorPos.y - 16,
      // backgroundColor: '#0e1112',
    }
  }

const mouseEnterHandler = () => {
  // setCursorBG('text');
}


  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
