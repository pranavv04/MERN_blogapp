import React from 'react';
import Login from './Login'
import Image01 from '/assets/images/17224074_v991-a-37-b.jpg'
const LoginPage = () => {
  return (
    <div className="flex h-screen">
      {/* Welcome Section */}
      <div className="w-1/2 bg-black flex justify-center items-center flex-col text-white">
        <h1 className="text-4xl font-bold font-mono">Welcome Back!</h1>
        <p className='text-white text-sm mt-5 font-mono '>Login and enjoy reading / creating Blogs</p>
        <img src={Image01} alt="" className='w-[500px] h-[300px] mt-5 rounded-lg'/>
      </div>
      {/* Login Form Section */}
      <div className="w-1/2 flex justify-center items-center">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
