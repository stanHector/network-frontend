import axios from "axios";

const BASE_URL = "https://network-performance.herokuapp.com/api/v1/users";

class UserService {
  getUsers() {
    return axios.get("https://network-performance.herokuapp.com/api/v1/users");
  }

  createUser(user) {
    return axios.post("https://network-performance.herokuapp.com/api/v1/user", user);
  }

  getUserById(userId) {
    return axios.get("https://network-performance.herokuapp.com/api/v1/user" + "/" + userId);
  }
  updateUser(user, userId) {
    return axios.put("https://network-performance.herokuapp.com/api/v1/user" + "/" + userId, user);
  }
  updateUsers(user, userId) {
    return axios.patch("https://network-performance.herokuapp.com/api/v1/user" + "/" + userId, user);
  }

  deleteUser(userId) {
    return axios.delete("https://network-performance.herokuapp.com/api/v1/user" + "/" + userId);
  } 

  loginUser(user) {
    return axios.post("https://network-performance.herokuapp.com/api/v1/login", user)
  }

  getUser(userId) {
    return axios.get("https://network-performance.herokuapp.com/api/v1/user" + "/" + userId)
  }
}
export default new UserService();
