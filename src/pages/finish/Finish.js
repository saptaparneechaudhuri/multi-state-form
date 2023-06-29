import "./finish.css";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/title/Title";
import Button from "../../components/button/Button";
import { highLightCircles } from "../../utilities";

//firebase
import {
  createAuthUserWithEmailAndPassword,
  createUserDoc,
} from "../../firebase";

import UserContext from "../../context/user";

const Finish = () => {
  const { userData, setUserData, totalItems, isSubmitted, setIsSubmit } =
    useContext(UserContext);

  const url = window.location.pathname;

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/thanks");
  };

  const finalSubmit = async () => {
    // alert("final submit");
    try {
      // pass display name as additional info
      await createUserDoc(userData.user, {
        displayName: userData.displayName,
        plan: userData.plan,
        addOns: userData.addOns,
      });
      setIsSubmit(true);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Email already in user");
      } else {
        console.log("sign up error", err);
      }
    }
  };

  useEffect(() => {
    let element = highLightCircles(url);

    return () => {
      element.classList.remove("active");
    };
  }, [url]);
  return (
    <section className="common">
      <Title
        title="Finishing up"
        subtitle="Double-check everything looks OK before confirming"
      />

      <div className="finish-container">
        <div className="finish-wrapper">
          <div className="final-plan">
            <p className="final-plan-title">
              {userData.plan.title}({userData.plan.type})
            </p>
            <p className="final-plan-bill">${userData.plan.price}/yr</p>
          </div>
          <div className="addon-services">
            {userData.addOns.map((item) => {
              return (
                <div key={item.id}>
                  <p className="service-name">{item.title}</p>
                  <p className="service-bill">+${item.subscription}/yr</p>
                </div>
              );
            })}
            {/* <div>
              <p className="service-name">Online service</p>
              <p className="service-bill">+$10/yr</p>
            </div>
            <div>
              <p className="service-name">Larger storage</p>
              <p className="service-bill">+$20/yr</p>
            </div> */}
          </div>
        </div>

        <div className="final-bill">
          <p className="total">Total(per year)</p>
          <p className="final-bill-amount">${totalItems}/yr</p>
        </div>
      </div>
      <Button
        text="Confirm"
        colorType="secondary"
        onClickNext={handleNavigate}
        submit={finalSubmit}
        // onFoo={onFoo}
      />
    </section>
  );
};

export default Finish;
