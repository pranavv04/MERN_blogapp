import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [editorContent, setEditorContent] = useState('');

  // Fetch the existing blog data by ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:2000/blogs/${id}`);
        if (response.ok) {
          const blog = await response.json();
          setTitle(blog.title);
          setImage(blog.image);
          setEditorContent(blog.content);
        } else {
          toast.error('Failed to load blog data');
        }
      } catch (error) {
        toast.error('Internal server error');
      }
    };
    fetchBlog();
  }, [id]);

  // Handle form submission for updating the blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      title,
      image,
      content: editorContent,
    };

    console.log("Sending data:", updatedFormData);

    try {
      const response = await fetch(`http://localhost:2000/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        toast.success('Blog updated successfully');
      } else {
        toast.error('Failed to update blog');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-100 min-h-screen p-10">
        <h1 className="text-2xl mb-4 text-center font-bold">Update Blog Post</h1>
        <div className="bg-white p-5 shadow-md rounded-lg">

          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title here"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />

          {/* Image URL Input */}
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL here"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />

          {/* ReactQuill Editor for content */}
          <ReactQuill
            value={editorContent}
            onChange={setEditorContent}
            className="h-48 mb-4"
          />

          {/* Submit Button */}
          <button
            className="bg-black text-white px-4 py-2 rounded text-md font-bold mt-10"
            type="submit"
          >
            Update
          </button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Update;
