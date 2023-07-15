import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Doctors from "./Doctors";
import Dashboard from "./Dashboard";
import Nurses from "./Nurses";
import Patients from "./Patient";
function DashboardNavigator() {
  const location = useLocation();
  const [pathname, setPathname] = React.useState();
  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);
  return (
    <div className="AppGlass2">
      <Sidebar />
      {pathname === "/doctor" && <Doctors />}
      {(pathname === "/dashboard" ||
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname === "/") && <Dashboard />}

      {pathname === "/nurse" && <Nurses />}

      {location.pathname === "/doctor" && <Doctors />}
      {location.pathname === "/patient" && <Patients />}
    </div>
  );
}

export default DashboardNavigator;
