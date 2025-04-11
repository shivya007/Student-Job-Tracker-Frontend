import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const createJob = async (job) =>{
    const response = await axios.post(`${API_URL}/api/jobs/create`, job);
    return response.data;
}
export const getJobs = async () =>{
    const response =  await axios.get(`${API_URL}/api/jobs/getJobs`);
    return response.data;
} 
export const updateJob = async (id, status) =>{
    const response = await axios.put(`${API_URL}/api/jobs/${id}/update`, { status });
    return response.data;
} 


export const deleteJob = async (id) => await axios.delete(`${API_URL}/api/jobs/${id}`);