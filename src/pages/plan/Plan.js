import "./plan.css";
import { planData } from "../../data/plans";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/title/Title";
import Button from "../../components/button/Button";
import { highLightCircles } from "../../utilities";

import UserContext from "../../context/user";

const Plan = () => {
  const [plans, setPlans] = useState([]);
  const [monthly, setMonthly] = useState(true);
  const [yearly, setYearly] = useState(false);

  // activeId should match the planItem's id in order to add the active class
  const [activeId, setActiveId] = useState("");
  const { userData, setUserData } = useContext(UserContext);

  const url = window.location.pathname;

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/addOn");
  };

  useEffect(() => {
    // setPlans(planData.monthly);
    let element = highLightCircles(url);

    if (monthly) {
      setPlans(planData.monthly);
    }
    if (yearly) {
      setPlans(planData.yearly);
    }

    return () => {
      element.classList.remove("active");
    };
  }, [url, monthly, yearly]);

  const handlePlan = (planItem) => {
    setActiveId(planItem.id);
    setUserData({
      ...userData,
      plan: planItem,
    });
  };
  return (
    <section className="common">
      <Title
        title="Select your plan"
        subtitle="You have the option of monthly or yearly billing"
      />

      <div className="plans">
        {plans.map((item) => {
          return (
            <div
              className={`plan-item ${activeId === item.id ? "active" : ""}`}
              key={item.id}
              onClick={() => handlePlan(item)}
            >
              <img src={`/images/icon-${item.title}.svg`} alt={item.title} />
              <div className="plan-wrapper">
                <p className="plan-name">{item.title}</p>
                <p className="plan-price">
                  ${item.price}/{item.type === "monthly" ? "mo" : "yr"}
                </p>
                {item.type === "yearly" ? (
                  <p className="plan-period">2 months free</p>
                ) : null}
              </div>
            </div>
          );
        })}
        {/* <div className="plan-item">
          <img src="/images/icon-arcade.svg" alt="arcade" />
          <p className="plan-name">Arcade</p>
          <p className="plan-price">$90/yr</p>
          <p className="plan-period">2 months free</p>
        </div>

        <div className="plan-item">
          <img src="/images/icon-advanced.svg" alt="advanced" />
          <p className="plan-name">Advanced</p>
          <p className="plan-price">$120/yr</p>
          <p className="plan-period">2 months free</p>
        </div>

        <div className="plan-item">
          <img src="/images/icon-pro.svg" alt="pro" />
          <p className="plan-name">Pro</p>
          <p className="plan-price">$150/yr</p>
          <p className="plan-period">2 months free</p>
        </div> */}
      </div>

      <div className="plan-select">
        <div>
          <input
            type="radio"
            className="checked"
            value={monthly}
            checked={monthly}
            onChange={() => {
              setMonthly(!monthly);
              setYearly(!yearly);
            }}
          />
          <label>Monthly</label>
        </div>

        <div>
          <input
            type="radio"
            className="checked"
            value={yearly}
            checked={yearly}
            onChange={() => {
              setYearly(!yearly);
              setMonthly(!monthly);
            }}
          />
          <label>Yearly</label>
        </div>
      </div>
      <Button
        text="Next Step"
        colorType="primary"
        onClickNext={handleNavigate}
      />
    </section>
  );
};

export default Plan;
