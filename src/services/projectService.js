import axios from "axios";

export function getAll() {
  return axios.get("/projects").then((resp) => resp.data);
}

export function remove(id) {
  return axios.delete(`/projects/${id}`);
}

export function update(id, payload) {
  return axios.post(`/projects/${id}`, payload).then((resp) => resp.data);
}

export function create(payload) {
  return axios.post("/projects", payload).then((resp) => resp.data);
}
