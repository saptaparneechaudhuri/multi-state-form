import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useContext } from "react";

//pages
import Home from "./pages/home/Home";
import Info from "./pages/info/Info";
import Plan from "./pages/plan/Plan";
import AddOn from "./pages/add-ons/AddOn";
import Finish from "./pages/finish/Finish";
import Thank from "./pages/thanks/Thank";

import UserContext from "./context/user";

const App = () => {
  const {
    userData: { user },
    isSubmit,
  } = useContext(UserContext);

  // if a user is created in the info page, then only one can navigate to plans and add ons and finish page

  return (
    <main className="main-container">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Info />} />
          <Route path="plan" element={user ? <Plan /> : <Navigate to="/" />} />
          <Route
            path="addon"
            element={user ? <AddOn /> : <Navigate to="/" />}
          />
          <Route
            path="summary"
            element={user && !isSubmit ? <Finish /> : <Navigate to="/" />}
          />
          <Route path="thanks" element={<Thank />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
