import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies for cross-origin requests
})

const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;