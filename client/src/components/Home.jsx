import React, { useEffect, useState } from "react";
import Code from "/assets/images/code.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [limit, setLimit] = useState(5); // Number of blogs to fetch
  const [hasMore, setHasMore] = useState(true); // Check if more blogs are available

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`https://mern-blogapp-e6sj.onrender.com/blogs?limit=${limit}`);
        if (response.ok) {
          const data = await response.json();
          // If data length is less than limit, set hasMore to false
          if (data.length < limit) {
            setHasMore(false);
          }
          setBlogs(data);
        } else {
          toast.error("Error in fetching data from the Database");
        }
      } catch (error) {
        toast.error("Internal server error");
      }
    };
    fetchBlogs();
  }, [limit]); // Fetch blogs whenever limit changes

  // Function to load more blogs
  const loadMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  return (
    <div className="bg-white">
      <div>
      <h3 className="p-5 text-xl font-bold font-mono">Trending</h3>
      </div>
      
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div
            className="flex justify-center gap-6 border border-gray-300 rounded-md shadow-sm"
            key={blog._id} // Assuming the blog has a unique _id field
          >
            <div className="h-[300px] ml-4 mt-4">
              <img
                src={blog.image || Code}
                alt={blog.title}
                className="h-[250px] w-[400px] object-cover rounded-md"
              />
            </div>

            <div className="w-[600px] flex flex-col">
              <h2 className="text-xl m-4 font-semibold uppercase">{blog.title}</h2>
              <p
                className="m-2 text-sm"
                dangerouslySetInnerHTML={{
                  __html: blog.content.substring(0, 200) + "...",
                }}
              />

              {/* Pass the blog title or ID as a parameter */}
              <Link
                to={`/singleblog/${blog._id}`}
                className="m-2 text-sm text-blue-500"
              >
                Read more..
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="h-[70vh]">
          <p className="text-center text-gray-500 text-3xl font-extrabold">
            No blogs available
          </p>
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            className="m-4 p-2 bg-black text-sm  text-white rounded-md"
          >
            Load More
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Home;

