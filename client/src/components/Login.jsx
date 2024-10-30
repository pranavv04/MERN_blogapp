import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const[formData , setFormData] = useState({
    username:'',
    password:''
  });

const navigate = useNavigate();

const handleInputChange = (e)=>{
  const {name , value}  = e.target;
  setFormData({
    ...formData,
    [name]: value
  });
};

const handleSubmit = async(e)=>{
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:2000/user/login',{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if(response.ok){
      localStorage.setItem('username' , formData.username)
      toast.success('Login successful !')
      
      setTimeout(() => {
        navigate('/')
      }, 2000);
    }
    else{
      toast.error('Login failed! Try again')
    }
  } catch (error) {
    toast.error('Login failed please try again')
  }
};
  return (
    <div>
      <form onSubmit={handleSubmit} action="" className='bg-gray-100 h-[88.5vh] flex justify-center align-middle text-center'  >
        <div className='flex flex-col justify-center items-center  border m-5 shadow-lg px-4 border-gray-300 w-[700px]'>
        <h2 className='text-2xl text-black  font-bold mb-5'>Login</h2>
        <p className='text-sm  text-gray-500'>Welcome Back. Please login your account</p>

        {/* <p className='text-sm text-gray-400 mt-5'>Enter Username</p> */}
        <input
         className='px-4 py-2 text-sm text-center border border-gray-400 text-black m-2 rounded-md bg-gray-100  placeholder:text-black w-[300px] placeholder:text-sm '
         name='username'
          type="text"   
          placeholder='Enter username..'
           value={formData.username} 
           onChange={handleInputChange} username='username'/>
       
        <input password='password' value={formData.password}  onChange={handleInputChange} className='px-4 text-sm  py-2 text-center m-2 rounded-md bg-gray-100 border border-gray-400  placeholder:text-black placeholder:text-sm  text-black w-[300px]' type="password" placeholder='Enter password..' name='password' />

        <div className='flex m-4'>
        <button className='bg-blue-500 transition duration-500 ease-in-out px-3 py-2 text-white rounded-md w-[90px] mt-4 text-sm font-semibold' type='submit'>Submit</button>
        <NavLink to='/signup'><p className='ml-7 mt-5 text-black underline '>New user? Sign Up</p></NavLink>
        </div>
       
        </div>
    </form>
    <ToastContainer/> 
    </div>
  )
}

export default Login
