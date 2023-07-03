import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const REACT_APP_BACKEND_URL = process.env["REACT_APP_BACKEND_URL"];

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/user/login`, {
        email: email,
        password: password,
      });

      // Store user data in AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(response.data));

      // Dispatch an action to update authentication state
      dispatch({ type: "LOGIN", payload: response.data });

      setIsLoading(false);
    } catch (error) {
      alert(error.response.data.message);
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}

export default useLogin;
