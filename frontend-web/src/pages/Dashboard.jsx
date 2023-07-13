import React from "react";
import MainDash from "../components/Dashboard/MainDash/MainDash";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import "./styles/Dashboard.css";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import usefetchAddressDetails from "../hooks/useFetchAddressDetails";
import Card from "../components/Dashboard/Card/Card";
function Dashboard() {
  const [modal, setModal] = React.useState(false);
  const [addName, setAddName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const { user } = useAuthContext();
  
  return (
    <>
      
         

      <div className="AppGlass2">
        <Sidebar />
        <div className="ContentWrapper">
          <ProfileHeader title={"Dashboard"} />
          <div className="AppGlass3">
            <Card/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
