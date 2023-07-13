import React, { useEffect } from "react";
import MainDash from "../components/Dashboard/MainDash/MainDash";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import "./styles/Dashboard.css";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import usefetchAddressDetails from "../hooks/useFetchAddressDetails";
import { useLocation } from "react-router-dom";

function Doctors() {
  const [modal, setModal] = React.useState(false);
  const [addName, setAddName] = React.useState("");
  const { user } = useAuthContext();
  const [doctorData, setDoctorData] = React.useState();
  const location = useLocation();

  const { fetchAddressDetails } = usefetchAddressDetails();
  const handleSubmit = () => {
    if (!addName) {
      alert("Please fill all the fields");
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/hospital/addDoctor`,
        {
          email: addName,

          user: user?.id,
        },
        { headers: { token: user?.token } }
      )
      .then((response) => {
        fetchAddressDetails(user?.id, user?.token);
        alert("Added Successfully");
        window.location.reload();
      });
    console.log(addName);
    setModal(false);
    setAddName("");
  };

  function getDoctors() {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/hospital/getHospital`,
        {
          params: {
            id: user?.userData.hospitalId[0],
          },
        },
        { headers: { token: user?.token } }
      )
      .then((response) => {
        setDoctorData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <>
      {modal && (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setModal(false);
                }}
              >
                X
              </button>
            </div>
            <div className="title">
              <h1>Add Doctor</h1>
              <input
                placeholder="Name"
                type="text"
                value={addName}
                onChange={(e) => {
                  setAddName(e.target.value);
                }}
              />
            </div>
            <div className="footer">
              <button
                onClick={() => {
                  handleSubmit();
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="AppGlass2">
        <Sidebar />
        <div className="ContentWrapper">
          <ProfileHeader title={"Manage Doctors"} />
          <div className="AppGlass3">
            <MainDash
              name="Doctors"
              setModal={setModal}
              data={doctorData}
              location={location.pathname}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Doctors;
