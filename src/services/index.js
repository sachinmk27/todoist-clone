import axios from "axios";
import * as projectService from "./projectService";

const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN;

axios.defaults.baseURL = "https://api.todoist.com/rest/v1";
axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;

export { projectService };
