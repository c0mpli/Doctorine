import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/global/Header";

const Dashboard=()=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return(
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
    )
}

export default Dashboard;