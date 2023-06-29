import "./side.css";
import { useEffect } from "react";

const Side = () => {
  const url = window.location.pathname;

  // const highLightCircles = (url) => {
  //   let element = "";
  //   switch (url) {
  //     case "/":
  //       element = document.querySelector("#info");
  //       element.classList.add("active");
  //       return element;
  //     case "/plan":
  //       element = document.querySelector("#plan");
  //       element.classList.add("active");
  //       return element;
  //     case "/addOn":
  //       element = document.querySelector("#addOn");
  //       element.classList.add("active");
  //       return element;

  //     case "/summary":
  //       element = document.querySelector("#summary");
  //       element.classList.add("active");
  //       return element;
  //     default:
  //       return element;
  //   }
  // };

  // useEffect(() => {
  //   let element = highLightCircles(url);
  //   console.log(url);

  //   return () => {
  //     element.classList.remove("active");
  //   };
  // }, [url]);
  return (
    <section className="side-container">
      <div className="form-steps">
        <div className="step" id="info">
          <div className="step-item-number">1</div>
          <div className="step-item-content">
            <p className="step-item-title">Step 1</p>
            <p className="step-item-info">Your info</p>
          </div>
        </div>

        <div className="step" id="plan">
          <div className="step-item-number">2</div>
          <div className="step-item-content">
            <p className="step-item-title">Step 2</p>
            <p className="step-item-info">Select plan</p>
          </div>
        </div>

        <div className="step" id="addOn">
          <div className="step-item-number">3</div>
          <div className="step-item-content">
            <p className="step-item-title">Step 3</p>
            <p className="step-item-info">add-0ns</p>
          </div>
        </div>

        <div className="step" id="summary">
          <div className="step-item-number">4</div>
          <div className="step-item-content">
            <p className="step-item-title">Step 4</p>
            <p className="step-item-info">summary</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Side;
