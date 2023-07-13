import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
function ImageClicker() {
  const navigation = useNavigation();
  let cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
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
          if (cameraRef) {
            let photo = await cameraRef.takePictureAsync();
            console.log(photo);
          }
        }}
      ></TouchableOpacity>
    </View>
  );
}

export default ImageClicker;
