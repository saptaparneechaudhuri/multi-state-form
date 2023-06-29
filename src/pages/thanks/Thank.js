import { useEffect } from "react";
import "./thank.css";
import { useNavigate } from "react-router-dom";

const Thank = () => {
  return (
    <section className="thanks-container">
      <img
        src="/images/icon-thank-you.svg"
        alt="thank you"
        className="thank-icon"
      />
      <h1>Thank you!</h1>
      {/* <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com
      </p> */}
    </section>
  );
};

export default Thank;
