import axios from "axios";

const url = "http://localhost:8000";

export async function register(name: string, email: string, password: string) {
  const response = await axios.post(`${url}/register`, {
    name,
    email,
    password,
  });
  return response.data.token;
}

export async function login(email: string, password: string) {
  const response = await axios.post(`${url}/login`, {
    email,
    password,
  });
  return response.data.token;
}
