//? Necessary Imports to make a secure login
import { createContext, useEffect, useState, useMemo } from "react";
import * as SecureStore from "expo-secure-store";

//*We create a varieble to save the context
export const AuthContext = createContext();

//! These users are only for test, they're gonna be deleted when backend is ready
const test_users = [
  { id: "1", name: "Yisus", email: "yisus@test.com", password: "1234" },
  { id: "2", name: "SenseCare", email: "sensecare@test.com", password: "1234" },
];

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
      console.log("siu")
    })();
  }, []);

  //*This useEffect is used to read user's token
  //   useEffect(() => {
  //   (async () => {
  //     try {
  //       const savedToken = await SecureStore.getItemAsync("token");
  //       const savedUser  = await SecureStore.getItemAsync("user");
  //       if (savedToken && savedUser) {
  //         setToken(savedToken);
  //         setUser(JSON.parse(savedUser));
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, []);

  //! While backend is ready
  const signIn = async (email, password) => {
    const found = test_users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) throw new Error("Invalid Credentials");

    // token ficticio sólo para demostrar persistencia
    await SecureStore.setItemAsync("currentUser", JSON.stringify(found));
    setUser(found);
  };

  //?Function to log into the app
  //   const signIn = async (email, password) => {
  //   const { token, user } = await loginRequest(email, password);

  //   await SecureStore.setItemAsync("token", jwt);
  //   await SecureStore.setItemAsync("user",  JSON.stringify(profile));

  //   setToken(jwt);
  //   setUser(profile);
  // };

  //! While backend is ready
  const signOut = async () => {
    await SecureStore.deleteItemAsync("currentUser");
    setUser(null);
  };

  //?Function to sign out of the app

  //   const signOut = async () => {
  //   await SecureStore.deleteItemAsync("token");
  //   await SecureStore.deleteItemAsync("user");
  //   setToken(null);
  //   setUser(null);
  // };

  //! While backend is ready
  const value = useMemo(
    () => ({ user, loading, signIn, signOut }),
    [user, loading]
  );

  // const value = useMemo(
  //   () => ({ user, token, loading, signIn, signOut }),
  //   [user, token, loading]
  // );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
