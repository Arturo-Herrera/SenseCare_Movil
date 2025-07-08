//? This file  will help to communicate with the backend and receive user information

//* Variable to save the backend URL
const URL_API = "https://url_del_back/api/auth";

//? Main function to make the request
export const loginRequest = async(email, password) => {
    const response = await fetch(`${URL_API}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });

    const data = await response.json();
    if(!response.ok) throw new Error(data || "Login Failed");
    
    return data
}