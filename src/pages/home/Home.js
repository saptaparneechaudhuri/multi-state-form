import "./home.css";
import { Outlet } from "react-router-dom";

import Side from "../../components/side/Side";

const Home = () => {
  return (
    <section className="home-container">
      <Side />
      <div className="wrapper">
        <Outlet />
        {/* <button className="next">Next Step</button> */}
      </div>
    </section>
  );
};

export default Home;
