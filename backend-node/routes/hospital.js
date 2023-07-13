const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const isAdmin = require("../middlewares/isAdmin");
const axios = require("axios");
const cron = require("node-cron");
const Hospital = require("../models/Hospital");
const Bed = require("../models/Bed");
const FormData = require("form-data");
const fs = require("fs");
const multer = require("multer");
const { json } = require("body-parser");

router.post("/create", async (req, res) => {
  const { name, numberOfBeds, address, admins, doctors, nurses } = req.body;

  if (!address || !numberOfBeds || !name)
    return res.status(400).send("One or more of the fields are missing.");

  const newHospital = new Hospital({
    name,
    numberOfBeds,
    address,
    admins,
    doctors,
    nurses,
  });
  return res.json(await newHospital.save());
});

router.get("/getHospital", async (req, res) => {
  const hospitalId = req.query.id;
  const hospital = await Hospital.findById(hospitalId);
  if (!hospital) return res.status(400).send("Hospital does not exist");

  //get all admins
  const admins = [];
  for (let i = 0; i < hospital.admins.length; i++) {
    const admin = await User.findById(hospital.admins[i]);
    admins.push(admin);
  }
  hospital.admins = admins;

  //get all doctors
  const doctors = [];
  for (let i = 0; i < hospital.doctors.length; i++) {
    const doctor = await User.findById(hospital.doctors[i]);
    doctors.push(doctor);
  }
  hospital.doctors = doctors;

  //get all nurses
  const nurses = [];
  for (let i = 0; i < hospital.nurses.length; i++) {
    const nurse = await User.findById(hospital.nurses[i]);
    nurses.push(nurse);
  }
  hospital.nurses = nurses;

  //get all patients
  const patients = [];
  for (let i = 0; i < hospital.patients.length; i++) {
    const patient = await User.findById(hospital.patients[i]);
    patients.push(patient);
  }
  hospital.patients = patients;

  return res.json(hospital);
});

router.post("/addAdmin", async (req, res) => {
  const { email, hospitalId } = req.body;

  const hospital = await Hospital.findOne({ _id: hospitalId });
  if (!hospital) return res.status(400).send("Hospital does not exist");
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("User does not exist");
  if (user.role !== "admin")
    return res.status(400).send("User is not an admin");

  const admins = hospital.admins;
  admins.push(user._id);
  hospital.admins = admins;
  await hospital.save();

  const hospitals = user.hospitalId;
  hospitals.push(hospital._id);
  user.hospitalId = hospitals;
  await user.save();

  return res.json(hospital);
});

router.post("/addDoctor", async (req, res) => {
  const { email, hospitalId } = req.body;
  const hospital = await Hospital.findOne({ _id: hospitalId });
  if (!hospital) return res.status(400).send("Hospital does not exist");
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("User does not exist");
  if (user.role !== "doctor")
    return res.status(400).send("User is not a doctor");

  const doctors = hospital.doctors;
  doctors.push(user._id);
  hospital.doctors = doctors;
  await hospital.save();

  const hospitals = user.hospitalId;
  hospitals.push(hospital._id);
  user.hospitalId = hospitals;
  await user.save();

  return res.json(hospital);
});

router.post("/addNurse", async (req, res) => {
  const { email, hospitalId } = req.body;
  const hospital = await Hospital.findOne({ _id: hospitalId });
  if (!hospital) return res.status(400).send("Hospital does not exist");
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("User does not exist");
  if (user.role !== "nurse") return res.status(400).send("User is not a nurse");

  const nurses = hospital.nurses;
  nurses.push(user._id);
  hospital.nurses = nurses;
  await hospital.save();

  const hospitals = user.hospitalId;
  hospitals.push(hospital._id);
  user.hospitalId = hospitals;
  await user.save();

  return res.json(hospital);
});

router.post("/addPatient", async (req, res) => {
  const { email, hospitalId } = req.body;

  const hospital = await Hospital.findOne({ _id: hospitalId });
  if (!hospital) return res.status(400).send("Hospital does not exist");
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("User does not exist");
  if (user.role !== "patient")
    return res.status(400).send("User is not a patient");

  const patients = hospital.patients;
  patients.push(user._id);
  hospital.patients = patients;
  await hospital.save();

  const hospitals = user.hospitalId;
  hospitals.push(hospital._id);
  user.hospitalId = hospitals;
  await user.save();

  return res.json(hospital);
});

router.post("/deleteDoctor", async (req, res) => {
  const { email, hospitalId } = req.body;

  const hospital = await Hospital.findOne({ _id: hospitalId });
  if (!hospital) return res.status(400).send("Hospital does not exist");

  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("User does not exist");
  if (user.role !== "doctor")
    return res.status(400).send("User is not a doctor");
  if (!hospital.doctors.includes(user._id))
    return res.status(400).send("Doctor is not in the hospital");

  const doctors = hospital.doctors;
  const index = doctors.indexOf(user._id);
  doctors.splice(index, 1);
  hospital.doctors = doctors;
  await hospital.save();

  const hospitals = user.hospitalId;
  const index2 = hospitals.indexOf(hospital._id);
  hospitals.splice(index2, 1);
  user.hospitalId = hospitals;
  await user.save();

  return res.json(hospital);
});

router.post("/deleteNurse", async (req, res) => {
  const { email, hospitalId } = req.body;
  const hospital = await Hospital.findOne({ _id: hospitalId });
  if (!hospital) return res.status(400).send("Hospital does not exist");

  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("User does not exist");
  if (user.role !== "nurse") return res.status(400).send("User is not a nurse");
  if (!hospital.nurses.includes(user._id))
    return res.status(400).send("Nurse is not in the hospital");

  const nurses = hospital.nurses;
  const index = nurses.indexOf(user._id);
  nurses.splice(index, 1);
  hospital.nurses = nurses;
  await hospital.save();

  const hospitals = user.hospitalId;
  const index2 = hospitals.indexOf(hospital._id);
  hospitals.splice(index2, 1);
  user.hospitalId = hospitals;
  await user.save();

  return res.json(hospital);
});

router.post("/deletePatient", async (req, res) => {
  const { email, hospitalId } = req.body;

  const hospital = await Hospital.findOne({ _id: hospitalId });
  if (!hospital) return res.status(400).send("Hospital does not exist");
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("User does not exist");
  if (user.role !== "patient")
    return res.status(400).send("User is not a patient");
  if (!hospital.patients.includes(user._id))
    return res.status(400).send("Patient is not in the hospital");

  const patients = hospital.patients;
  const index = patients.indexOf(user._id);
  patients.splice(index, 1);
  hospital.patients = patients;
  await hospital.save();

  const hospitals = user.hospitalId;
  const index2 = hospitals.indexOf(hospital._id);
  hospitals.splice(index2, 1);
  user.hospitalId = hospitals;
  await user.save();

  return res.json(hospital);
});

router.post("/assignBed", async (req, res) => {
  const { hospitalId, patientId, nurseId, doctorId } = req.body;

  const hospital = await Hospital.findOne({ _id: hospitalId });
  if (!hospital) return res.status(400).send("Hospital does not exist");

  const bed = await Bed.create({
    hospitalId: hospitalId,
    patientId: patientId,
    nurseId: nurseId,
    doctorId: doctorId,
  });

  const beds = hospital.beds;
  beds.push(bed._id);
  hospital.beds = beds;
  await hospital.save();

  const nurse = await User.findOne({ _id: nurseId });
  const nurses = nurse.beds;
  nurses.push(bed._id);
  nurse.beds = nurses;
  await nurse.save();

  const doctor = await User.findOne({ _id: doctorId });
  const doctors = doctor.beds;
  doctors.push(bed._id);
  doctor.beds = doctors;
  await doctor.save();

  const patient = await User.findOne({ _id: patientId });
  const patients = patient.beds;
  patients.push(bed._id);
  patient.beds = patients;
  await patient.save();

  return res.json(hospital);
});

router.post("/removeBed", async (req, res) => {});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/addData", upload.single("image"), (req, res) => {
  const { hospitalId, bedNo } = req.body;

  if (!hospitalId) return res.status(400).send("No hospitalId in request body");
  if (!bedNo) return res.status(400).send("No bedNo in request body");

  const hospital = Hospital.findOne({ _id: hospitalId });
  if (!hospital) return res.status(400).send("Hospital does not exist");

  const bed = Bed.findOne({ hospitalId: hospitalId, bedNo: bedNo });
  if (!bed) return res.status(400).send("Bed does not exist");

  const user = User.findOne({ _id: bed.patientId });
  if (!user) return res.status(400).send("User does not exist");

  const imageFile = req.file;
  if (!imageFile) return res.status(400).send("No image file in request body");

  const formData = new FormData();
  formData.append("file", fs.createReadStream(imageFile.path));
  const data = axios
    .post(`${process.env.FLASK_URI}/predict`, formData, {
      headers: formData.getHeaders(),
    })
    .then((response) => {
      const data = response.data;
      console.log(data);
      user.data.push(data);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

module.exports = router;
