import axios from "axios";

const BASE_URL = "https://network-performance.herokuapp.com/api/v1/performance";


export const GetNetworks = async () => {
    try {
        const { data } = await axios.get(BASE_URL)
        return data
    } catch (error) {
        return error.message
    }
}

export const CreatePerformances = async (performance) => {
    console.log(performance)
    try {
        const data = await axios.post("https://network-performance.herokuapp.com/api/v1/performance", performance)
        return data
    } catch (error) {
        return error.message
    }
}


class NetworkService {
    getNetworkPerformance() {
        return axios.get("https://network-performance.herokuapp.com/api/v1/performance");
    }

    createNetworkPerformance(performance) {
        return axios.post(BASE_URL, performance);
    }

    // getTicketById(ticketId) {
    //     return axios.get(BASE_URL + "/" + ticketId);
    // }

    updatePerformance(performance, performanceId) {
        return axios.put(BASE_URL + "/" + performanceId, performance);
    }
    // updateTickets(ticket, ticketId) {
    //     return axios.patch(BASE_URL + "/" + ticketId, ticket);
    // }

    deletePerformance(performanceId) {
        return axios.delete(BASE_URL + "/" + performanceId);
    }
}
export default new NetworkService();