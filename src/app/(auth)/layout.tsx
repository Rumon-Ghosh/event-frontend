import React from 'react';

const AuthLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <div>
      <header> 
        <h1>Auth Layout</h1>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;