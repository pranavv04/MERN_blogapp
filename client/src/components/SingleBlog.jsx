import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SingleBlog = () => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState({});
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:2000/blogs/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setBlogData(data);
                } else {
                    toast.error('Error in fetching data');
                }
            } catch (error) {
                toast.error('Internal server error');
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:2000/blogs/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                toast.success('Blog deleted successfully');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                toast.error('Blog deleted unsuccessfully');
            }
        } catch (error) {
            toast.error('Blog deleted unsuccessfully');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <div className="m-4 ml-12">
                    <Link to='/'>
                        <button className="bg-blue-500 px-2 py-2 rounded-3xl hover:bg-black text-white transition duration-500 ease-in-out">
                            <IoArrowBack className="text-xl" />
                        </button>
                    </Link>
                </div>
                <div className="flex text-center mt-10 flex-col">
                    <h1 className="text-3xl font-bold font-serif">
                        {blogData.title || 'Loading...'}
                    </h1>
                    <p className="text-sm mt-4">
                        Blog written by:
                        <span className="font-bold text-blue-500">{blogData.username || 'Loading...'}</span>
                    </p>
                    <div className="h-[400px] flex justify-center mt-9">
                        {blogData.image ? (
                            <img src={blogData.image} alt={blogData.title} className="h-[400px] rounded-xl" />
                        ) : (
                            <div className="h-[400px] flex items-center justify-center">
                                <p>No image available</p>
                            </div>
                        )}
                    </div>
                    <div className="m-20 text-left whitespace-pre-wrap">
                        <div dangerouslySetInnerHTML={{ __html: blogData.content || 'Loading...' }} />
                    </div>
                    {username === blogData.username ? (
                        <div className="mt-5 flex justify-center">
                            <button onClick={handleDelete} className="text-red-500 font-bold hover:underline ease-in-out transition duration-500">
                                Delete Blog
                            </button>
                            <button className="m-4 px-4 py-2 bg-black text-white rounded-md font-bold">
                                Update Blog
                            </button>
                        </div>
                    ) : (
                        <p className="text-md font-bold mt-6">Thanks for reading</p>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SingleBlog;