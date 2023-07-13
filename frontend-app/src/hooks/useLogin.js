import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();
  const REACT_APP_BACKEND_URL = process.env["REACT_APP_BACKEND_URL"];
  const navigator = useNavigation();
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `https://doctorine-node.onrender.com/user/login`,
        {
          email: email,
          password: password,
        }
      );
      const data = response.data;
      await AsyncStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
      navigator.navigate("Home");
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}

export default useLogin;
