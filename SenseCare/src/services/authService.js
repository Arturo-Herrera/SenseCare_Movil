//? This file  will help to communicate with the backend and receive user information

//* Variable to save the backend URL
const URL_API = "http://192.168.1.72:5221/api/Auth/login";

//? Main function to make the request
export const loginRequest = async(email, password, deviceType) => {
  try {
    const response = await fetch(`${URL_API}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password, deviceType})
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Login Failed");

    return data;
  } catch (error) {
    console.error("Login request failed:", error);
    throw error;
  }
};