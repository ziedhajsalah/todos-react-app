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
