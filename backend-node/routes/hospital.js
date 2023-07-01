const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const isAdmin = require("../middlewares/isAdmin");
const axios = require("axios");
const cron = require("node-cron");
const Hospital = require("../models/Hospital");

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
  const { hospitalId } = req.params;
  const hospital = await Hospital.findOne({ _id: hospitalId });
  if (!hospital) return res.status(400).send("Hospital does not exist");
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

module.exports = router;
