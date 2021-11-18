import axios from "axios";

const BASE_URL = "https://network-performance.herokuapp.com/api/v1/tickets";


export const GetTickets = async () => {
  try {
    const { data } = await axios.get(BASE_URL)
    return data
  } catch (error) {
    return error.message
  }
}

export const CreateTickets = async (ticket) => {
  console.log(ticket)
  try {
    const data = await axios.post("https://network-performance.herokuapp.com/api/v1/tickets", ticket)
    return data
  } catch (error) {
    return error.message
  }
}


class TicketService {
  getTickets() {
    return axios.get("https://network-performance.herokuapp.com/api/v1/tickets");
  }

  createTicket(ticket) {
    return axios.post(BASE_URL, ticket);
  }

  getTicketById(ticketId) {
    return axios.get("https://network-performance.herokuapp.com/api/v1/ticket" + "/" + ticketId);
  }

  updateTicket(ticket, ticketId) {
    return axios.put("https://network-performance.herokuapp.com/api/v1/ticket" + "/" + ticketId, ticket);
  }
  updateTickets(ticket, ticketId) {
    return axios.patch("https://network-performance.herokuapp.com/api/v1/ticket" + "/" + ticketId, ticket);
  }

  deleteTicket(ticketId) {
    return axios.delete("https://network-performance.herokuapp.com/api/v1/ticket" + "/" + ticketId);
  }
}
export default new TicketService();