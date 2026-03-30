import { useAuth } from '@/providers/AuthProvider';
import { axiosSecure } from '@/lib/axios';
import { useEffect } from 'react';

const useAxiosSecure = () => {
  const { logout } = useAuth();

  useEffect(() => {
    // Request interceptor to add token to headers
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('token='))
          ?.split('=')[1];

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle 401/403
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  return axiosSecure;
};

export default useAxiosSecure;
