import React from 'react'
import Image01 from '/assets/images/24071026_bwink_med_12_single_01.jpg'
import Image02 from '/assets/images/9949331_4288106.jpg'
import Image03 from '/assets/images/24122384_bwink_ppl_15_single_05.jpg'
import './navbar.css'
import {Link} from 'react-router-dom'
import { IoLogoRss } from "react-icons/io";

const MainPage = () => {
  return (
    <div className='flex flex-col items-center justify-around bg-white'>
      <div className='flex '>
      <h1 className='logo text-3xl font-bold mt-10 mb-10 text-black'>Blogify</h1>
      <IoLogoRss className='text-3xl mt-10' />
      <Link to='/allblogs'>
      <button className='ml-10 font-mono font-bold bg-black text-white py-2 px-3 m-10 rounded-2xl border border-black hover:text-black hover:bg-white transition ease-in-out duration-300'>Explore Blogs</button>
      </Link>
      </div>
       
        <div className='flex flex-row items-center justify-around '>
        <img src={Image01} alt=""  className='h-[400px] w-[500px] mr-10'/>
        <div className='w-[500px] text-wrap ml-10 shadow-md px-3 py-4 rounded-md'>
        <p className='text-sm   '>Step into a vibrant community where stories and ideas flourish. Our blog is more than just articles; it's a space for curious minds to discover fresh perspectives, gain insights, and ignite creativity. Whether you're looking to learn something new or just unwind with a good read, there's something here for everyone</p>
        </div>  
        </div>
        <div className='flex flex-row items-center justify-around '>
       
        <div className='w-[500px] text-wrap mr-10 shadow-md px-3 py-4 rounded-md'>
        <p className='text-sm   '>Experience content that resonates with you, crafted by voices eager to share knowledge, inspiration, and passion. From deep dives into trending topics to unique takes on everyday life, our blog offers a blend of thought-provoking articles and relatable stories that keep you engaged.</p>
        </div>
        <img src={Image02} alt=""  className='h-[400px] w-[500px] ml-10'/>
        </div>
        <div className='flex flex-row items-center justify-around '>
        <img src={Image03} alt=""  className='h-[400px] w-[500px] mr-10'/>
        <div className='w-[500px] text-wrap ml-10 shadow-md px-3 py-4 rounded-md'>
        <p className='text-sm   '>Join us on a journey through captivating stories and shared experiences that spark connection. Here, every post invites you to pause, reflect, and discover something new. Dive into topics that matter, connect with like-minded readers, and become part of a community where inspiration is always within reach.</p>
        </div>
        </div>

      
    </div>
  )
}

export default MainPage
