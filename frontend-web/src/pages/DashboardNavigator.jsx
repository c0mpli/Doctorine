import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Doctors from "./Doctors";
import Dashboard from "./Dashboard";
import Nurses from "./Nurses";
import Patients from "./Patient";
function DashboardNavigator() {
  const location = useLocation();
  return (
    <div className="AppGlass2">
      <Sidebar />
      {location.pathname === "/doctor" && <Doctors />}
      {(location.pathname === "/dashboard" ||
        location.pathname === "/login" ||
        location.pathname === "/signup") && <Dashboard />}

      {location.pathname === "/nurse" && <Nurses />}

      {location.pathname === "/doctor" && <Doctors />}
      {location.pathname === "/patient" && <Patients />}
    </div>
  );
}

export default DashboardNavigator;
