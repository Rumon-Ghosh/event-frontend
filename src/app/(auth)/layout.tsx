import Logo from '@/components/shared/Logo';
import React from 'react';

const AuthLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className='max-w-6xl mx-auto py-3 lg:py-6'>
      <header> 
        <Logo></Logo>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;