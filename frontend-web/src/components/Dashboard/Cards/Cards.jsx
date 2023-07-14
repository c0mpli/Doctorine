import React, { useEffect, useState } from "react";
import "./Cards.css";
import Card from "../Card/Card";
import { useAuthContext } from "../../../hooks/useAuthContext";
import axios from "axios";

const Cards = () => {
  const [totalSupplyEth, setTotalSupplyEth] = useState("loading...");
  const [ethPrice, setEthPrice] = useState("loading...");
  const { user } = useAuthContext();
  const [doctorData, setDoctorData] = React.useState();



//   function getDoctors() {
//     axios
//       .get(
//         `${process.env.REACT_APP_BACKEND_URL}/hospital/getHospital`,
//         {
//           params: {
//             id: user?.userData.hospitalId[0],
//           },
//         },
//         { headers: { token: user?.token } }
//       )
//       .then((response) => {
//         setDoctorData(response.data.result);
//         console.log(response.data);
//       })
//       .catch((err) => {
//         alert(err);
//       });
//   }

//   useEffect(() => {
//     const intervalCall=setInterval(async()=>{
//       getDoctors();
//   }, []);
//   return () => {
//     clearInterval(intervalCall);
//   };
// }, []);


  return (
    <>
      <div className="Cards">
        <div className="parentContainer">
          {/* <Card title="Total Doctors" value={getDoctors} /> */}
          <Card title="Total Doctors" />
        </div>
        <div className="parentContainer">
          <Card title="Total Nurses" />
        </div>
        <div className="parentContainer">
          <Card title="Assign Bed"  />
        </div>
      </div>
    </>
  );
};

export default Cards;
