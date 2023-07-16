import React, { useEffect } from "react";
import MainDash from "../components/Dashboard/MainDash/MainDash";
import ProfileHeader from "../components/ProfileHeader";
import "./styles/Dashboard.css";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

function Dashboard() {
  const [modal, setModal] = React.useState(false);
  const [doctorEmail, setDoctorEmail] = React.useState("");
  const [nurseEmail, setNurseEmail] = React.useState("");
  const [patientEmail, setPatientEmail] = React.useState("");
  const [bedNo, setBedNo] = React.useState("");
  const { user } = useAuthContext();
  const [hospitalData, setHospitalData] = React.useState();
  const [data, setData] = React.useState();
  const handleSubmit = () => {
    if (!doctorEmail || !nurseEmail || !patientEmail || !bedNo) {
      alert("Please fill all the fields");
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/hospital/assignBed`,
        {
          hospitalId: user?.userData.hospitalId[0],
          doctorEmail: doctorEmail,
          nurseEmail: nurseEmail,
          patientEmail: patientEmail,
          bedNo: bedNo,
        },
        { headers: { token: user?.token } }
      )
      .then((response) => {
        alert("Added Successfully");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
    setModal(false);
    setDoctorEmail("");
    setNurseEmail("");
    setPatientEmail("");
  };

  useEffect(() => {
    const abortController = new AbortController();
    function getBeds() {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/hospital/getBeds`,
          {
            params: {
              id: user?.userData.hospitalId[0],
            },
          },
          { headers: { token: user?.token } }
        )
        .then((response) => {
          console.log(response.data);
          setHospitalData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function getHospital() {
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
          console.log(response.data);
          setData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getBeds();
    getHospital();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
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
              <h1>Assgin Bed</h1>
              <input
                placeholder="Doctor Email"
                value={doctorEmail}
                onChange={(e) => {
                  setDoctorEmail(e.target.value);
                }}
              />
              <input
                placeholder="Nurse Email"
                value={nurseEmail}
                onChange={(e) => {
                  setNurseEmail(e.target.value);
                }}
              />
              <input
                placeholder="Patient Email"
                value={patientEmail}
                onChange={(e) => {
                  setPatientEmail(e.target.value);
                }}
              />
              <input
                placeholder="Bed Number"
                value={bedNo}
                onChange={(e) => {
                  setBedNo(e.target.value);
                }}
              />
            </div>
            <div className="footer">
              <button
                onClick={() => {
                  handleSubmit();
                }}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="ContentWrapper">
        <ProfileHeader title={"Dashboard"} />
        <div className="AppGlass3">
          <MainDash
            setModal={setModal}
            dashboard={true}
            name="Assign Beds"
            data={hospitalData}
            hospitalStats={{
              doctor: data?.doctors.length,
              nurse: data?.nurses.length,
              patient: data?.patients.length,
              bed: `${data?.numberOfBeds - data?.beds.length}/${
                data?.numberOfBeds
              }`,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
