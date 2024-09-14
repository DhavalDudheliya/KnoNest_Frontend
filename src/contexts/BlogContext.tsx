import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the types for blog and context
export interface Blog {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  author: string;
  likes: string[]; // Array of user IDs
  comments: { user: string; text: string }[];
}

interface BlogContextType {
  blog: Blog | undefined;
  blogs: Blog[];
  fetchBlog: (id: string) => void;
  fetchBlogs: () => void;
  addBlog: (blog: Blog) => void;
  updateBlog: (blog: Blog) => void;
  deleteBlog: (id: string) => void;
  likeBlog: (id: string) => void;
  isLoading: boolean;
  addCommentOnBlog: (id: string, comment: string) => void;
}

// Create the context
export const BlogContext = createContext<BlogContextType | undefined>(
  undefined
);

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blog, setBlog] = useState<Blog>();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all blogs from the server
  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/blogs/getBlogs");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new blog
  const addBlog = async (newBlog: Blog) => {
    try {
      await axios.post("/blogs/createBlog", newBlog);
      fetchBlogs();
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  // Update an existing blog
  const updateBlog = async (updatedBlog: Blog) => {
    try {
      await axios.put(`/blogs/updateBlog/` + updatedBlog._id, updatedBlog);
      setBlogs(
        blogs.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog))
      );
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  // Delete a blog by its ID
  const deleteBlog = async (id: string) => {
    try {
      await axios.delete(`/blogs/deleteBlog/` + id);
      setBlogs(blogs.filter((blog) => blog._id.toString() !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Fetch a blog by its ID
  const fetchBlog = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/blogs/getBlogById/${id}`);
      setBlog(response.data.blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Like a blog
  const likeBlog = async (id: string) => {
    try {
      await axios
        .post(`/blogs/likeBlog/` + id)
        .then((res) => {
          if (res.status === 200) {
            setBlog(res.data.blog);
            // Fetch blogs again
            fetchBlogs();
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            navigate("/login");
          }
          console.log(err);
        });
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  // Add a comment on a blog
  const addCommentOnBlog = async (id: string, comment: string) => {
    console.log(comment);

    try {
      await axios
        .post(`/blogs/addCommentOnBlog/` + id, { comment })
        .then((res) => {
          if (res.status === 200) {
            setBlog(res.data.blog);
            // Fetch blogs again
            fetchBlogs();
          }
        });
    } catch (error) {
      console.error("Error adding comment on blog:", error);
    }
  };

  // Fetch blogs on initial load
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        blog,
        fetchBlog,
        blogs,
        fetchBlogs,
        addBlog,
        updateBlog,
        deleteBlog,
        likeBlog,
        isLoading,
        addCommentOnBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
