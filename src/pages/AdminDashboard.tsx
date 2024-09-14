import AddBlogDialog from "@/components/Admin/AddBlogDialog";
import { BlogContext } from "@/contexts/BlogContext";
import { Trash } from "lucide-react";
import { useContext } from "react";

// Utility function to truncate text to a specific word limit
const truncateText = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + " ...";
  }
  return text;
};

const AdminDashboard = () => {
  const blogContext = useContext(BlogContext);

  if (!blogContext) {
    throw new Error("BlogContext is not defined");
  }

  const { blogs, deleteBlog } = blogContext;

  return (
    <div className="p-6 flex flex-col gap-4 items-center justify-center">
      <div className="text-2xl">Admin Dashboard</div>
      <AddBlogDialog />
      <div>
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                SubTitle
              </th>
              <th scope="col" className="px-6 py-3">
                Content
              </th>
              <th scope="col" className="px-6 py-3">
                ImageURL
              </th>
              <th scope="col" className="px-6 py-3">
                Likes
              </th>
              <th scope="col" className="px-6 py-3">
                Comments
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs &&
              blogs.map((blog, index) => (
                <tr
                  key={blog._id}
                  className="bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{blog.title}</td>
                  <td className="px-6 py-4">
                    {blog.subtitle && truncateText(blog.subtitle, 10)}
                  </td>
                  <td className="px-6 py-4">
                    {blog.content && truncateText(blog.content, 10)}
                  </td>
                  <td className="px-6 py-4">
                    {blog.imageUrl && blog.imageUrl.slice(0, 15) + "..."}
                  </td>
                  <td className="px-6 py-4">
                    {blog.likes && blog.likes.length}
                  </td>
                  <td className="px-6 py-4">
                    {blog.comments && blog.comments.length}
                  </td>
                  <td
                    className="px-6 py-4"
                    onClick={() => deleteBlog(blog._id)}
                  >
                    <Trash color="red" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
