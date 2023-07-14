import React, { useEffect } from "react";
import MainDash from "../components/Dashboard/MainDash/MainDash";
import ProfileHeader from "../components/ProfileHeader";
import "./styles/Dashboard.css";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import Card from "../components/Dashboard/Card/Card";
import Cards from "../components/Dashboard/Cards/Cards";
import DashboardNavigator from './DashboardNavigator'

function Dashboard() {
;  const [modal, setModal] = React.useState(false);
  const [addName, setAddName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const { user } = useAuthContext();
  const [hospitalData, setHospitalData] = React.useState([]);
 
  return (
    <>
    
      <div className="ContentWrapper">
        <ProfileHeader
          title={hospitalData != [] ? `${hospitalData?.name}'s Dashboard` : ``}
        />
        
        <div className="AppGlass3">
          <Cards/>
          
        </div>
        <DashboardNavigator/>
        
        
      </div>
      
    </>
  );
}

export default Dashboard;
