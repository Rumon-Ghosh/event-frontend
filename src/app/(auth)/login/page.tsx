import LoginForm from '@/components/form/LoginForm';
import React from 'react';

const LoginPage = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-base-200 text-base-content max-w-4xl mx-auto p-10 my-3 rounded-2xl'>
      <h2 className='text-2xl font-semibold my-3 text-center'>Login to continue <br /> with <span className='text-base-100 font-bold'>EventEra</span></h2>
      <LoginForm></LoginForm>
    </div>
  );
};

export default LoginPage;