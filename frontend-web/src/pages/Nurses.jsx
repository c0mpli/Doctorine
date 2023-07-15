import React, { useEffect } from "react";
import MainDash from "../components/Dashboard/MainDash/MainDash";
import ProfileHeader from "../components/ProfileHeader";
import "./styles/Dashboard.css";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Nurses() {
  const [modal, setModal] = React.useState(false);
  const [addName, setAddName] = React.useState("");
  const location = useLocation();
  const { user } = useAuthContext();
  const [nurseData, setNurseData] = React.useState();
  const handleSubmit = () => {
    // if (!addName || !address) {
    if (!addName) {
      alert("Please fill all the fields");
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/hospital/addNurse`,
        {
          email: addName,
          hospitalId: user?.userData.hospitalId[0],
        },

        { headers: { token: user?.token } }
      )
      .then((response) => {
        alert("Added Successfully");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
    console.log(addName);
    setModal(false);
    setAddName("");
    // setAddress("");
  };

  useEffect(() => {
    const abortController = new AbortController();
    function getNurses() {
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
          setNurseData(response.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
    getNurses();

    return () => {
      abortController.abort();
    };
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
              <h1>Add Nurse</h1>
              <input
                placeholder="Email"
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
      <div className="ContentWrapper">
        <ProfileHeader title={"Manage Nurses"} />
        <div className="AppGlass3">
          <MainDash
            name="Add Nurses"
            setModal={setModal}
            data={nurseData}
            location={location.pathname}
          />
        </div>
      </div>
    </>
  );
}

export default Nurses;
