import React from "react";
import "./Cards.css";
import Card from "../Card/Card";

const Cards = ({ hospitalStats }) => {
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
          <Card title="Doctors" value={hospitalStats.doctor} />
        </div>
        <div className="parentContainer">
          <Card title="Nurses" value={hospitalStats.nurse} />
        </div>
        <div className="parentContainer">
          <Card title="Patients" value={hospitalStats.patient} />
        </div>
        <div className="parentContainer">
          <Card title="Beds Empty" value={hospitalStats.bed} />
        </div>
      </div>
    </>
  );
};

export default Cards;
