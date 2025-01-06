import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const fetchTickets = () => API.get('/tickets');
export const reserveTicket = (id) => API.post(`/tickets/reserve/${id}`);
