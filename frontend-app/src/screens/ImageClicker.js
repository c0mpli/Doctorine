import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { Text, View, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

function ImageClicker() {
  const { user } = useAuthContext();
  const navigation = useNavigation();
  let cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [scanning, setScanning] = useState(false);

  async function handleSave() {
    setScanning(true);
    const data = new FormData();
    const hospitalId = user?.userData.hospitalId[0];
    data.append("file", {
      uri: photo.uri,
      type: "image/jpeg",
      name: `${new Date()}.jpg`,
    });
    axios
      .post("https://doctorine-flask.serveo.net/predict", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const t = res.data;
        const a = { HR: t.HR, RR: t.RR, BP: t.SBP };
        setScanning(false);
        Alert.alert(JSON.stringify(a));
        navigation.navigate("Home");
      })
      .catch((error) => {
        setScanning(false);
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      });
  }
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const resultCameraPersmission = cameraPermission.status === "granted";
      setHasCameraPermission(resultCameraPersmission);
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <Text>Requesting Permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera denied. Please change it in the settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    return (
      <View style={{ flex: 1, paddingVertical: 120, backgroundColor: "black" }}>
        <Image
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          style={{ flex: 1 }}
        />
        {!scanning && (
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 60,
              left: 40,
            }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text style={{ color: "white" }}>Back</Text>
          </TouchableOpacity>
        )}
        {!scanning && (
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 60,
              alignSelf: "center",
              color: "white",
            }}
            onPress={handleSave}
          >
            <Text style={{ color: "white" }}>Scan</Text>
          </TouchableOpacity>
        )}
        {scanning && (
          <Text
            style={{
              position: "absolute",
              bottom: 60,
              alignSelf: "center",
              color: "white",
            }}
          >
            Scanning...
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingVertical: 120, backgroundColor: "black" }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={(ref) => {
          cameraRef = ref;
        }}
      ></Camera>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 60,
          left: 40,
        }}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={{ color: "white" }}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 40,
          alignSelf: "center",
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: "white",
        }}
        onPress={async () => {
          takePic();
        }}
      ></TouchableOpacity>
    </View>
  );
}

export default ImageClicker;
