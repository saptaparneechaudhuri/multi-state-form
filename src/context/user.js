import { useState, createContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    user: "",
    displaName: "",

    plan: "",
    addOns: [],
    totalPrice: 0,
  });

  const [totalItems, setTotalItems] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    let total = userData.plan.price;
    if (userData.addOns.length > 0) {
      total = userData.addOns.reduce(
        (amount, item) => amount + item.subscription,
        total
      );
    }

    setTotalItems(total);
  }, [userData]);
  const value = {
    userData: userData,
    setUserData: setUserData,
    totalItems: totalItems,
    isSubmit: isSubmit,
    setIsSubmit: setIsSubmit,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
