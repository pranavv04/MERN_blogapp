import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

const Footer = () => {
  return (
    <div className='bg-black text-white flex justify-around items-center w-full py-6'>
      <p>Designed and Developed by Pranav</p>
      <div className='flex items-center'>
        <p className='mr-5'>Connect with me:</p>
        <FaLinkedin className='text-2xl mr-2 cursor-pointer' />
        <FaSquareInstagram className='text-2xl mr-2 cursor-pointer' />
        <FaGithub className='text-2xl mr-2 cursor-pointer' />
        <CiMail className='text-2xl mr-2 cursor-pointer' />
      </div>
    </div>
  );
};

export default Footer;
