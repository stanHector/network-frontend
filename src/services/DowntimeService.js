import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/downtime";


export const GetDowntimes = async () => {
  try {
    const { data } = await axios.get(BASE_URL)
    return data
  } catch (error) {
    return error.message
  }
}

export const CreateDowntimes = async (downtime) => {
  console.log(downtime)
  try {
    const data = await axios.post(BASE_URL, downtime)
    return data
  } catch (error) {
    return error.message
  }
}


class DowntimeService {
  getDowntimes() {
    return axios.get("http://localhost:8080/api/v1/downtimes");
  }

  createDowntime(downtime) {
    return axios.post(BASE_URL, downtime);
  }

  getDowntimeById(downtimeId) {
    return axios.get(BASE_URL + "/" + downtimeId);
  }

  updateDowntime(downtime, downtimeId) {
    return axios.put(BASE_URL + "/" + downtimeId, downtime);
  }
  updateDowntimes(downtime, downtimeId) {
    return axios.patch(BASE_URL + "/" + downtimeId, downtime);
  }

  deleteDowntime(downtimeId) {
    return axios.delete(BASE_URL + "/" + downtimeId);
  }
}
export default new DowntimeService();