const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const isAdmin = require("../middlewares/isAdmin");
const axios = require("axios");
const Hospital = require("../models/Hospital");
const Bed = require("../models/Bed");
const FormData = require("form-data");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { Server } = require("socket.io");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const io = new Server(3000);

io.on("connection", (socket) => {
  // send a message to the client
  socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

  // receive a message from the client
  socket.on("hello from client", (...args) => {
    // ...
  });
});

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

router.get("/getBeds", async (req, res) => {
  const hospitalId = req.query.id;
  const hospital = await Hospital.findById(hospitalId);
  if (!hospital) return res.status(400).send("Hospital does not exist");

  const beds = await Bed.find({ hospitalId: hospitalId });
  const bedsData = [];
  for (let i = 0; i < beds.length; i++) {
    const bed = beds[i];
    //get patient
    const patient = await User.findById(bed.patientId);
    //get doctor
    const doctor = await User.findById(bed.doctorId);
    //get nurse
    const nurse = await User.findById(bed.nurseId);

    const t = {
      patientData: [patient.name, patient.email],
      doctorData: [doctor.name, doctor.email],
      nurseData: [nurse.name, nurse.email],
      bedData: [bed.bedNumber],
    };
    bedsData.push(t);
  }
  return res.json(bedsData);
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
  const { hospitalId, patientEmail, nurseEmail, doctorEmail, bedNo } = req.body;

  const patient = await User.findOne({ email: patientEmail });
  if (!patient) return res.status(400).send("Patient does not exist");

  const doctor = await User.findOne({ email: doctorEmail });
  if (!doctor) return res.status(400).send("Doctor does not exist");

  const nurse = await User.findOne({ email: nurseEmail });
  if (!nurse) return res.status(400).send("Nurse does not exist");

  const hospital = await Hospital.findOne({ _id: hospitalId });
  if (!hospital) return res.status(400).send("Hospital does not exist");

  const bed = await Bed.create({
    hospitalId: hospital._id,
    patientId: patient._id,
    nurseId: nurse._id,
    doctorId: doctor._id,
    bedNumber: bedNo,
  });

  const beds = hospital.beds;
  const t = hospital.patients;
  beds.push(bed._id);
  t.push(patient._id);
  hospital.beds = beds;
  hospital.patients = t;
  await hospital.save();

  const nurses = nurse.beds;
  nurses.push(bed._id);
  nurse.bedId = nurses;
  await nurse.save();

  const doctors = doctor.beds;
  doctors.push(bed._id);
  doctor.bedId = doctors;
  await doctor.save();

  const patients = patient.beds;
  patients.push(bed._id);
  patient.bedId = patients;
  await patient.save();

  return res.json({ bed, doctor, nurse, patient });
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

router.post("/addData", upload.single("image"), async (req, res) => {
  console.log("hit");
  const { hospitalId, bedNo } = req.body;

  if (!hospitalId) return res.status(400).send("No hospitalId in request body");
  if (!bedNo) return res.status(400).send("No bedNo in request body");

  const hospital = await Hospital.findOne({ _id: hospitalId });
  if (!hospital) return res.status(400).send("Hospital does not exist");

  const bed = await Bed.findOne({ hospitalId: hospitalId, bedNumber: bedNo });
  if (!bed) return res.status(400).send("Bed does not exist");

  const user = await User.findOne({ _id: bed.patientId });
  if (!user) return res.status(400).send("User does not exist");

  const imageFile = req.file;
  if (!imageFile) return res.status(400).send("No image file in request body");

  const formData = new FormData();
  formData.append("file", fs.createReadStream(imageFile.path));
  await axios
    .post(`${process.env.FLASK_URI}/predict`, formData, {
      headers: formData.getHeaders(),
    })
    .then(async (response) => {
      const data = response.data;
      console.log(data);
      user.data.push(data);
      return res.json(await user.save());
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

router.post("/extractframes", async (req, res) => {
  const videoPath = `C:/Users/jashd/OneDrive/Documents/Github/Personal Projects/Doctorine/backend-node/routes/a.mp4`;
  const outputDir = `C:/Users/jashd/OneDrive/Documents/Github/Personal Projects/Doctorine/backend-node/output`;
  const fps = 110;
  try {
    ffmpeg({ source: "./routes/a.mp4" })
      .on("filenames", (filenames) => {
        console.log("oppp");
      })
      .on("end", () => {
        console.log("finished");
      })
      .on("error", (err) => {
        console.log(err);
      })
      .takeScreenshots(
        {
          filename: "output.png",
          timemarks: [
            8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            25, 26, 27, 28, 29, 30,
          ],
        },
        "output"
      );
  } catch (err) {
    console.log(err);
  }
});

router.post("/postframes", async (req, res) => {
  const folderPath = "./output/";
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return;
    }

    // Filter out image files
    const imageFiles = files.filter((file) => {
      const extension = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".gif"].includes(extension);
    });

    // Process each image file
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    try {
      async function load() {
        // We need to wrap the loop into an async function for this to work
        for (var i = 0; i < imageFiles.length; i++) {
          const imagePath = path.join(folderPath, imageFiles[i]);
          console.log("Processing image:", imagePath);
          sendFlask(imagePath);

          await timer(3000); // then the created Promise can be awaited
        }
      }

      load();
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
});

async function sendFlask(imagePath) {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(imagePath));
  axios
    .post(`${process.env.FLASK_URI}/predict`, formData, {
      headers: formData.getHeaders(),
    })
    .then(async (response) => {
      const data = response.data;
      if (data.HR != 0 && data.SBP != 0 && data.RR != 0) console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function sendSocket() {
  //
}

module.exports = router;
