import { useState, useEffect, createContext } from "react";

const BillContext = createContext();

export const Billprovider = ({ children }) => {
  const [totalItems, setTotalItems] = useState([]);
  const [finalBill, setFinalBill] = useState(0);

  const addItems = (itemToAdd) => {};
  return <BillContext.Provider>{children}</BillContext.Provider>;
};

export default BillContext;
