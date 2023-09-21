import React, { useState, useEffect, createContext } from 'react';

export const FocusContext = createContext();

const FocusProvider = ({ children }) => {
 const [isAboutActive, setIsAboutActive] = useState(false);
 const [isPortfolioActive, setIsPortfolioActive] = useState(false);
 const [isContactActive, setIsContactActive] = useState(false);
 const [isAdminActive, setIsAdminActive] = useState(false);

 function toggleAboutActive() {
  setIsAboutActive(true);
  setIsPortfolioActive(false);
  setIsContactActive(false);
  setIsAdminActive(false);
 }

 function togglePortfolioActive() {
  setIsPortfolioActive(true);
  setIsAboutActive(false);
  setIsContactActive(false);
  setIsAdminActive(false);
 }

 function toggleContactActive() {
  setIsPortfolioActive(false);
  setIsAboutActive(false);
  setIsContactActive(true);
  setIsAdminActive(false);
 }

 function toggleAdminActive() {
  setIsPortfolioActive(false);
  setIsAboutActive(false);
  setIsContactActive(false);
  setIsAdminActive(true);
 }

 function hideAll() {
  setIsPortfolioActive(false);
  setIsAboutActive(false);
  setIsContactActive(false);
  setIsAdminActive(false);
 }

 return (
  <FocusContext.Provider
   value={{
    isAboutActive,
    isPortfolioActive,
    isContactActive,
    isAdminActive,
    toggleAboutActive,
    togglePortfolioActive,
    toggleContactActive,
    toggleAdminActive,
    hideAll,
   }}
  >
   {children}
  </FocusContext.Provider>
 );
};

export default FocusProvider;
