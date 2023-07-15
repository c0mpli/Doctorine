import React, { useEffect } from "react";
import MainDash from "../components/Dashboard/MainDash/MainDash";
import ProfileHeader from "../components/ProfileHeader";
import "./styles/Dashboard.css";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import usefetchAddressDetails from "../hooks/useFetchAddressDetails";
import Card from "../components/Dashboard/Card/Card";
import Cards from "../components/Dashboard/Cards/Cards";
import DashboardNavigator from './DashboardNavigator'
import { useLocation } from "react-router-dom";

function Dashboard() {
  const [modal, setModal] = React.useState(false);
  const [doctorEmail, setDoctorEmail] = React.useState("");
  const [nurseEmail, setNurseEmail] = React.useState("");
  const [patientEmail, setPatientEmail] = React.useState("");
  const { user } = useAuthContext();
  const [hospitalData, setHospitalData] = React.useState([]);
  const location = useLocation();

  const { fetchAddressDetails } = usefetchAddressDetails();
  const handleSubmit = () => {
    if (!doctorEmail || !nurseEmail) {
      alert("Please fill all the fields");
      return;
    }
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_BACKEND_URL}/hospital/addDoctor`,
  //       {
  //         email: doctorEmail,

  //         user: user?.id,
  //       },
  //       { headers: { token: user?.token } }
  //     )
  //     .then((response) => {
  //       fetchAddressDetails(user?.id, user?.token);
  //       alert("Added Successfully");
  //       window.location.reload();
  //     });
  //   setModal(false);
  //   setDoctorEmail("");
  //   // setNurseEmail("");
  //   // setPatientEmail("");
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
        setHospitalData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    getDoctors();
  }, []);

const noOfDoc=hospitalData?.doctors?.length;
const noOfNurse=hospitalData?.nurses?.length;
 
  return (
    <>
    
      <div className="ContentWrapper">
        <ProfileHeader
          title={hospitalData != [] ? `${hospitalData?.name}'s Dashboard` : ``}
        />
        
        <div className="AppGlass3">
          <Card value= {noOfDoc} 
          title="Total Doctors"
          />
        </div>
        <div className="AppGlass3">
          <Card value= {noOfNurse} 
          title="Total Nurses"
          />
        </div>
        
        <DashboardNavigator/>
        
      </div>
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
              <h1>Add Details</h1>
              <input
                placeholder="Doctor's Email"
                type="text"
                value={doctorEmail}
                onChange={(e) => {
                  setDoctorEmail(e.target.value);
                }}
              />
              <input
                placeholder="Nurse's Email"
                type="text"
                value={nurseEmail}
                onChange={(e) => {
                  setDoctorEmail(e.target.value);
                }}
              />
              <input
                placeholder="Patient's Email"
                type="text"
                value={patientEmail}
                onChange={(e) => {
                  setDoctorEmail(e.target.value);
                }}
              />

            </div>
            <div className="footer">
              <button
                onClick={() => {
                  handleSubmit();
                }}
              >
                Assign Beds
              </button>
            </div>
          </div>
        </div>
      )}
      <div className>
        {/* <ProfileHeader title={"Manage Doctors"} /> */}
        <div className="AppGlass3">
          <MainDash
            name="Manage Beds"
            setModal={setModal}
            data={hospitalData}
            location={location.pathname}
          />
          
        </div>
      </div>
    </>
  );
}

export default Dashboard;
