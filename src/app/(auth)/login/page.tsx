import LoginForm from '@/services/auth/components/Login'
import { unauthRequire } from '@/lib/auth-utils';
import React from 'react'


async function page() {
  // await unauthRequire();

  return (  
    <div className='grid place-items-center min-h-dvh p-3'>
        <LoginForm />
    </div>
  ) 
}

export default page 