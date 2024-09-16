import React, { useEffect, useState } from 'react';
import Code from '/assets/images/code.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Home = () => {
   const [blogs, setBlogs] = useState([]);

   useEffect(() => {
      const fetchBlogs = async () => {
         try {
            const response = await fetch('http://localhost:2000/blogs');
            if (response.ok) {
               const data = await response.json();
               setBlogs(data);
            } else {
               toast.error('Error in fetching data from the Database');
            }
         } catch (error) {
            toast.error('Internal server error');
         }
      };
      fetchBlogs();
   }, []);

   return (
      <div>
         <h3 className='m-4 text-xl font-bold'>Explore Blogs</h3>
         {blogs.length > 0 ? (
            blogs.map((blog) => (
               <div
                  className='flex justify-center gap-6 border border-gray-300 rounded-md shadow-sm'
                  key={blog._id}  // Assuming the blog has a unique _id field
               >
                  <div className='h-[300px] ml-4 mt-4'>
                     <img
                        src={blog.image || Code}
                        alt={blog.title}
                        className='h-[200px] rounded-md'
                     />
                  </div>
                  <div className='w-[600px] flex flex-col h- text-wrap '>
                     <h2 className='text-xl m-4 font-semibold'>{blog.title}</h2>
                     <p className='m-2 text-sm'>{blog.content.substring(0, 200)}...</p>
                     {/* Pass the blog title or ID as a parameter */}
                     <Link to={`/singleblog/${blog._id}`} className='m-2 text-sm text-blue-500'>
    Read more..
</Link>

                  </div>
               </div>
            ))
         ) : (
            <>
               <div className='h-[70vh]'>
                  <p className='text-center text-gray-500 text-3xl font-extrabold'>
                     No blogs available
                  </p>
               </div>
            </>
         )}
         <ToastContainer />
      </div>
   );
};

export default Home;

