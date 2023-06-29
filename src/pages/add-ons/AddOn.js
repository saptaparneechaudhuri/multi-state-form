import "./addon.css";
import { addOnData } from "../../data/addOn";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/title/Title";
import Button from "../../components/button/Button";
import { highLightCircles } from "../../utilities";

import UserContext from "../../context/user";

const AddOn = () => {
  const url = window.location.pathname;
  const [addOns, setAddOns] = useState(addOnData);
  const { userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/summary");
  };

  useEffect(() => {
    let element = highLightCircles(url);

    return () => {
      element.classList.remove("active");
    };
  }, [url, userData]);

  const hanldeClassName = (addonItem) => {
    // if userData.addOns  array contains the addonItem.id, add active class
    let exists = userData.addOns.find((item) => item.id === addonItem.id);

    if (exists) {
      return `addon-item active`;
    } else {
      // console.log("removing");
      return `addon-item`;
    }
  };

  const handleChecked = (addonItem) => {
    // if userData.addOns array contains addonitem, set the checked property true
    let exists = userData.addOns.find((item) => item.id === addonItem.id);
    if (exists) {
      return true;
    } else {
      return false;
    }
  };

  const handleAddOn = (addonItem) => {
    // to toggle the addon items, if add on items exists, remove it else add it
    let existingItem = userData.addOns.find((item) => item.id === addonItem.id);
    if (existingItem) {
      //remove addon
      let modifiedAddOns = userData.addOns.filter(
        (item) => item.id !== addonItem.id
      );
      setUserData({
        ...userData,
        addOns: modifiedAddOns,
      });
    } else {
      // add addons
      setUserData({ ...userData, addOns: [...userData.addOns, addonItem] });
    }
  };

  return (
    <section className="common">
      <Title
        title="Pick add-ons"
        subtitle="Add-ons help enhance your gaming experience"
      />
      <div className="addons">
        {addOns.map((item) => {
          return (
            <div
              className={`${hanldeClassName(item)}`}
              key={item.id}
              onClick={() => handleAddOn(item)}
            >
              <input
                type="checkbox"
                className="checkbox"
                checked={handleChecked(item)}
                readOnly
              />
              <div className="content">
                <p className="addon-title">{item.title}</p>
                <p className="addon-description">{item.description}</p>
              </div>
              <p className="subscription">{`+$${item.subscription}/yr`}</p>
            </div>
          );
        })}
        {/* <div className="addon-item active">
          <input type="checkbox" className="checkbox" />
          <div className="content">
            <p className="addon-title">Online Service</p>
            <p className="addon-description">Access to multiplayer games</p>
          </div>
          <p className="subscription">+$10/yr</p>
        </div>

        <div className="addon-item active">
          <input type="checkbox" className="checkbox" />
          <div className="content">
            <p className="addon-title">Larger Storage</p>
            <p className="addon-description">Extra 1TB of cloud save</p>
          </div>
          <p className="subscription">+$20/yr</p>
        </div>

        <div className="addon-item ">
          <input type="checkbox" className="checkbox" />
          <div className="content">
            <p className="addon-title">Customizable profile</p>
            <p className="addon-description">Custom theme on your profile</p>
          </div>
          <p className="subscription">+$30/yr</p>
        </div> */}
      </div>
      <Button
        text="Next Step"
        colorType="primary"
        onClickNext={handleNavigate}
      />
    </section>
  );
};

export default AddOn;
