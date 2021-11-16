import axios from "axios";

const BASE_URL = "https://network-performance.herokuapp.com/api/v1/users";

class UserService {
  getUsers() {
    return axios.get("https://network-performance.herokuapp.com/api/v1/users");
  }

  createUser(user) {
    return axios.post(BASE_URL, user);
  }

  getUserById(userId) {
    return axios.get(BASE_URL + "/" + userId);
  }
  updateUser(user, userId) {
    return axios.put(BASE_URL + "/" + userId, user);
  }
  updateUsers(user, userId) {
    return axios.patch(BASE_URL + "/" + userId, user);
  }

  deleteUser(userId) {
    return axios.delete(BASE_URL + "/" + userId);
  }

  

  loginUser(user) {
    return axios.post("https://network-performance.herokuapp.com/api/v1/login", user)
  }

  getUser(userId) {
    return axios.get(BASE_URL + "/" + userId)
  }
}
export default new UserService();
