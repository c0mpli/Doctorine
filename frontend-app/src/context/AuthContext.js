import { createContext, useReducer } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  async function fetchDetails() {
    const user = await JSON.parse(AsyncStorage.getItem("user"));
    if (user) {
      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    }
  }
  useEffect(() => {
    fetchDetails();
  }, [state]);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
