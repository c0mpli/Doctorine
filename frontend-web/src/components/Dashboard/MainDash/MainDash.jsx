import React from "react";
// import Cards from "../Cards/Cards";
import Programs from "../Programs/Programs";
import "./MainDash.css";
import Card from '../Card/Card'

const MainDash = ({setModal, name}) => {
  return (
    <>
      <div className="MainDash">
        <h2>Total {name}</h2>
        <Card />
        <div className="maindash-heading-wrapper">
          <h2>Your {name}</h2>
          <button
            className="standard-button"
            onClick={() => setModal(true)}
          >
            Add {name}
          </button>
        </div>
        <Programs />
      </div>
    </>
  );
};

export default MainDash;
