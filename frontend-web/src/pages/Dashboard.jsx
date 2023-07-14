import React, { useEffect } from "react";
import MainDash from "../components/Dashboard/MainDash/MainDash";
import ProfileHeader from "../components/ProfileHeader";
import "./styles/Dashboard.css";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import Card from "../components/Dashboard/Card/Card";
import usefetchAddressDetails from "../hooks/useFetchAddressDetails";
function Dashboard() {
  const [modal, setModal] = React.useState(false);
  const [addName, setAddName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const { user } = useAuthContext();
  const [hospitalData, setHospitalData] = React.useState([]);
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
  return (
    <>
      <div className="ContentWrapper">
        <ProfileHeader
          title={hospitalData != [] ? `${hospitalData?.name}'s Dashboard` : ``}
        />
        <div className="AppGlass3">
          <Card />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
