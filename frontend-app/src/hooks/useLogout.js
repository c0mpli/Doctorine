import React from "react";
import { useAuthContext } from "./useAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
function useLogout() {
  const { dispatch } = useAuthContext();
  const navigator = useNavigation();
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigator.navigate("Login");
  };
  return { logout };
}

export default useLogout;
