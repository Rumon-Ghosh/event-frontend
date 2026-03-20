import RegisterForm from '@/components/form/RegisterForm';
import React from 'react';

const RegisterPage = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-base-200 text-base-content max-w-4xl mx-auto p-10 my-3 rounded-2xl'>
      <h2>Register page</h2>
      <RegisterForm></RegisterForm>
    </div>
  );
};

export default RegisterPage;