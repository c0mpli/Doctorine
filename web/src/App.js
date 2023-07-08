import { useState } from "react";
import { Routes, Route,BrowserRouter } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "./components/global/Sidebar";
import Dashboard from "./screens/dashboard/dashboard";
import Topbar from "./components/global/Topbar";
import Nurse from "./screens/Nurse/Nurse";
import Doctor from "./screens/Doctor/Doctor"; 
import Patient from "./screens/Patient/Patient";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
      <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/nurse" element={<Nurse />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/patient" element={<Patient />} />
              
            </Routes>
            </BrowserRouter>
          </main>
      </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
