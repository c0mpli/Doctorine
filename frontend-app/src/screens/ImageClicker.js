import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
function ImageClicker() {
  const navigation = useNavigation();
  let cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
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
    let savePhoto = async () => {};
    return (
      <View style={{ flex: 1, paddingVertical: 120, backgroundColor: "black" }}>
        <Image
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          style={{ flex: 1 }}
        />
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
            bottom: 60,
            alignSelf: "center",
            color: "white",
          }}
        >
          <Text style={{ color: "white" }}>Save</Text>
        </TouchableOpacity>
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
