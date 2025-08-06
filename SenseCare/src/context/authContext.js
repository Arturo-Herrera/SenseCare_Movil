//? Necessary Imports to make a secure login
import { createContext, useEffect, useState, useMemo } from "react";
import * as SecureStore from "expo-secure-store";
import { loginRequest } from "../services/authService";

//*We create a varieble to save the context
export const AuthContext = createContext();

//? Main function used in App.js
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  //! While backend is ready
  useEffect(() => {
    (async () => {
      const json = await SecureStore.getItemAsync("currentUser");
      if (json) setUser(JSON.parse(json));
      setLoading(false);
      console.log("siu");
    })();
  }, []);

  //! While backend is ready
  const signIn = async (email, password) => {
    try {
      const deviceType = "mobile";

      const res = await loginRequest(email, password, deviceType);

      if (res.status !== 0) throw new Error(res.message);

      const user = {
        id: res.data.id,
        email: email,
        role: res.data.rol
      };

      console.log("DATA FROM BACKEND", res.data);

      await SecureStore.setItemAsync("currentUser", JSON.stringify(user));
      setUser(user);
      console.log("Siu", user);
      console.log("Login Response:", res);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  //! While backend is ready
  const signOut = async () => {
    await SecureStore.deleteItemAsync("currentUser");
    setUser(null);
  };

  //! While backend is ready
  const value = useMemo(
    () => ({ user, loading, signIn, signOut }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
