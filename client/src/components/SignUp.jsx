import React, { useState } from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  // State to store form inputs
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
 

  const navigate = useNavigate();
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:2000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        localStorage.setItem('username' , formData.username)
        toast.success('Sign-up successful!');

        setTimeout(()=>{
        navigate('/'); //navigates to homepage
        }, 2000)
      } else {
        toast.error('Sign-up failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='bg-gray-100 h-[88.5vh] flex justify-center align-middle text-center'>
        <div className='flex flex-col justify-center items-center border border-black m-5 px-4 rounded-lg'>
          <h2 className='text-4xl text-blue-500 font-bold mb-5'>Welcome, Sign in to My Blogs.</h2>

          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className='px-4 py-2 text-center m-2 rounded-md bg-gray-100 border border-black placeholder:text-black text-black w-[300px]'
            type="text"
            placeholder='Enter your name'
          />
          <input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className='px-4 py-2 text-center m-2 rounded-md border border-black bg-gray-100 placeholder:text-black text-black w-[300px]'
            type="text"
            placeholder='Enter username'
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className='px-4 py-2 text-center m-2 rounded-md bg-gray-100 placeholder:text-black text-black border border-black w-[300px]'
            type="email"
            placeholder='Enter your email'
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className='px-4 py-2 text-center m-2 rounded-md bg-gray-100 placeholder:text-black text-black border border-black w-[300px]'
            type="password"
            placeholder='Enter password'
          />
          <div className='flex m-3'>
            <button
              type="submit"
              className='bg-black transition duration-500 ease-in-out px-4 py-2 text-white rounded-md w-[90px] hover:bg-gray-900 mt-4 text-md font-semibold'>
              Submit
            </button>
            <NavLink to='/login'>
              <p className='mt-6 ml-3 text-blue-500 underline'>Already have an account?</p>
            </NavLink>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
