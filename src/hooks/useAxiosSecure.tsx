import { useAuth } from '@/providers/AuthProvider';
import { axiosSecure } from '@/lib/axios';
import { useEffect } from 'react';

const useAxiosSecure = () => {
  const { logout } = useAuth();

  useEffect(() => {
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
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  return axiosSecure;
};

export default useAxiosSecure;
