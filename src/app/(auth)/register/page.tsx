import RegisterForm from '@/components/form/RegisterForm';

const RegisterPage = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-base-200 text-base-content max-w-4xl mx-auto p-10 my-3 rounded-2xl'>
      <h2 className='text-2xl font-semibold my-3'>Welcome to <span className='text-base-100 font-bold'>EventEra!</span></h2>
      <RegisterForm></RegisterForm>
    </div>
  );
};

export default RegisterPage;