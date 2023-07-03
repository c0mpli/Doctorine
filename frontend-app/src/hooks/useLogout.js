import React from "react";
import { useAuthContext } from "./useAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
function useLogout() {
  const { dispatch } = useAuthContext();
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
}

export default useLogout;
