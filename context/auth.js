import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// context
const AuthContext = createContext();

// provider
const AuthProvider = ({ children }) => {
  // Global State
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const loadLocalStorage = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data);
      setState({ ...state, user: loginData?.user, token: loginData?.token });
    };
    loadLocalStorage();
  }, []);

  //   default axios settings
  axios.defaults.headers.common["Authorization"] = `Bearer ${state?.token}`;
  axios.defaults.baseURL = "http://192.168.100.242:8084/api/v1";
  //   intial local storage data

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
