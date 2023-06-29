import "./info.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/title/Title";
import Button from "../../components/button/Button";

import { highLightCircles } from "../../utilities";
import {
  createAuthUserWithEmailAndPassword,
  createUserDoc,
} from "../../firebase";

import UserContext from "../../context/user";

const defaultFormFields = {
  name: "",
  email: "",

  password: "",
};

const Info = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { userData, setUserData } = useContext(UserContext);

  const url = window.location.pathname;

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/plan");
  };

  const hanldeInputValueChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formFields.name || !formFields.email || !formFields.password) {
      alert("Please fill in the credentials");
    }
    try {
      const response = await createAuthUserWithEmailAndPassword(
        formFields.email,
        formFields.password
      );
      setUserData({
        ...userData,
        user: response.user,
        displayName: formFields.name,
      });
      handleNavigate();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Email already in user");
      }
      if (err.code === "auth/invalid-email") {
        alert("Invalid email");
      } else {
        console.log("sign up error", err);
      }
    }
  };

  useEffect(() => {
    let element = highLightCircles(url);
    // console.log(url);

    return () => {
      element.classList.remove("active");
    };
  }, [url]);
  return (
    <section className="common">
      <Title
        title="Personal info"
        subtitle="Please provide your name, email addres, and phone number"
      />

      <form className="info-form" id="form" onSubmit={handleSubmit}>
        <div className="form-item">
          <label>Name</label>
          <input
            name="name"
            className="form-input"
            placeholder="e.g. John Doe"
            type="text"
            value={formFields.name}
            onChange={hanldeInputValueChange}
          />
        </div>
        <div className="form-item">
          <label>Email Adress</label>
          <input
            name="email"
            className="form-input"
            placeholder="e.g. example@email.com"
            type="email"
            value={formFields.email}
            onChange={hanldeInputValueChange}
          />
        </div>

        <div className="form-item">
          <label>Password</label>
          <input
            name="password"
            className="form-input"
            type="password"
            value={formFields.password}
            onChange={hanldeInputValueChange}
          />
        </div>
        <div style={{ alignSelf: "flex-end" }}>
          <Button text="Next Step" colorType="primary" />
        </div>
      </form>
      {/* <Button
        form="form"
        text="Next Step"
        colorType="primary"
        submit={handleSubmit}
        onClickNext={handleNavigate}
      /> */}
    </section>
  );
};

export default Info;
