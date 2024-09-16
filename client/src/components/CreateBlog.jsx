import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill styles
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBlog = () => {
  const [editorContent, setEditorContent] = useState(''); // For blog content
  const [title, setTitle] = useState(''); // For blog title
  const [image, setImage] = useState(''); // For image URL
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    content: '',
    username: ''
  });

  // Retrieve username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setFormData((prevData) => ({
        ...prevData,
        username: storedUsername
      }));
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update formData with title, image, and content before submission
    const updatedFormData = {
      ...formData,
      title,
      image,
      content: editorContent // Use the editor content
    };

    try {
      const response = await fetch('http://localhost:2000/blogs/addblog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        toast.success('Blog posted successfully');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  // Handle title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value); // Update title state
  };

  // Handle content change from the editor
  const handleContentChange = (content) => {
    setEditorContent(content); // Update editor content state
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-100 min-h-screen p-10">
        <h1 className="text-2xl mb-4 text-center font-bold">Create a Blog Post</h1>
        <div className="bg-white p-5 shadow-md rounded-lg">

          {/* Title Input */}
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
            placeholder="Enter title here"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />

          {/* Image URL Input */}
          <input
            type="text"
            value={image}
            name="image"
            onChange={(e) => setImage(e.target.value)} // Directly set the image
            placeholder="Enter image URL here"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />

          {/* ReactQuill Editor for content */}
          <ReactQuill
            value={editorContent}
            onChange={handleContentChange}
            className="h-48 mb-4"
          />

          {/* Submit Button */}
          <button
            className="bg-black text-white px-4 py-2 rounded text-md font-bold mt-10"
            type="submit"
          >
            Post
          </button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default CreateBlog;
