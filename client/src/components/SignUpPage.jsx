import React from 'react'
import SignUp from './SignUp';
import Image02 from '/assets/images/104732-OMV0IC-943.jpg'
const SignUpPage = () => {
  return (
   
     
    <div className="flex h-screen">
      {/* Welcome Section */}
      <div className="w-1/2 bg-black flex justify-center items-center flex-col text-white">
         
        <h1 className="text-4xl font-mono font-bold">Welcome To Blogify!</h1>
        <p className='text-white font-mono text-sm mt-5 '>Here you can write your thoughts and also you can explore other people's opinion</p>
        <img src={Image02} alt="" className='w-[500px] h-[300px] mt-5 rounded-lg'/>
      </div>
      {/* Login Form Section */}
      <div className="w-1/2 flex justify-center items-center">
      <SignUp />
      </div>
    </div>

  )
}

export default SignUpPage ;
