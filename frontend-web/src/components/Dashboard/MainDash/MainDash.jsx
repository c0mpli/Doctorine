import React from "react";
// import Cards from "../Cards/Cards";
import Programs from "../Programs/Programs";
import "./MainDash.css";

const MainDash = ({ data, setModal, name, location, dashboard }) => {
  const t = name.split(" ");
  return (
    <>
      <div className="MainDash">
        <div className="maindash-heading-wrapper">
          <h2>{dashboard ? "Manage Beds" : `Your ${t[1]}`}</h2>
          <button className="standard-button" onClick={() => setModal(true)}>
            {name}
          </button>
        </div>
        <Programs
          data={data}
          location={location}
          name={name}
          dashboard={dashboard}
        />
      </div>
    </>
  );
};

export default MainDash;
