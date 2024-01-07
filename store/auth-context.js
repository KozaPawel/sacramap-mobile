import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  refreshToken: "",
  isAuthenticated: false,
  authenticate: (token, refreshToken) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  function authenticate(token, refreshToken) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);

    setRefreshToken(refreshToken);
    AsyncStorage.setItem("refreshToken", refreshToken);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");

    setRefreshToken(null);
    AsyncStorage.removeItem("refreshToken");
  }

  const value = {
    token: authToken,
    refreshToken: refreshToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
