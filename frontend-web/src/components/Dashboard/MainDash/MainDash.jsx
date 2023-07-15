import React from "react";
// import Cards from "../Cards/Cards";
import Programs from "../Programs/Programs";
import "./MainDash.css";
import Card from "../Card/Card";

const MainDash = ({ data, setModal, name, location }) => {
  return (
    <>
      <div className="MainDash">
        <div className="maindash-heading-wrapper">
          <h2>Your {name}</h2>
          <button className="standard-button" onClick={() => setModal(true)}>
            {name}
          </button>
        </div>
        <Programs data={data} location={location} name={name} />
      </div>
    </>
  );
};

export default MainDash;
