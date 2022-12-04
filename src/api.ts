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

function getConfig() {
  return {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
}

export async function getTodos() {
  const response = await axios.get(`${url}/todos`, getConfig());

  return response.data;
}

export async function createTodo(title: string) {
  const response = await axios.post(`${url}/todos`, { title }, getConfig());

  return response.data;
}

export async function completeTodo(id: number) {
  const response = await axios.put(
    `${url}/todos/${id}/complete`,
    null,
    getConfig()
  );

  return response.data;
}

export async function uncompleteTodo(id: number) {
  const response = await axios.put(
    `${url}/todos/${id}/uncomplete`,
    null,
    getConfig()
  );

  return response.data;
}

export async function deleteTodo(id: number) {
  const response = await axios.delete(`${url}/todos/${id}`, getConfig());

  return response.data;
}
