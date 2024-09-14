import { useContext } from "react";
import { BlogContext } from "../contexts/BlogContext";
import { Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Blog } from "../contexts/BlogContext";
import { Link } from "react-router-dom";
import { UserContext } from "@/contexts/UserContext";

const HomePage = () => {
  const { user } = useContext(UserContext) || { user: null };
  const blogContext = useContext(BlogContext);

  if (!blogContext) {
    return <div>Error: Blog context not found!</div>;
  }

  const { blogs, isLoading } = blogContext;

  return (
    <>
      {isLoading ? (
        <p className="text-lg h-screen flex items-center justify-center">
          Loading...
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-6 p-4 w-full z-0 mb-10">
            {blogs &&
              blogs.map((blog: Blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/` + blog._id}
                  className="border border-neutral-200 rounded-lg overflow-hidden cursor-pointer"
                >
                  {blog.imageUrl && (
                    <div className="max-h-[200px]">
                      <img
                        className="max-h-[200px] w-full object-cover"
                        src={blog.imageUrl}
                        alt={blog.title}
                      />
                    </div>
                  )}
                  <div className="p-4 flex flex-col gap-4">
                    <div className="flex flex-row items-center justify-start gap-4">
                      <div>
                        <Avatar>
                          <AvatarImage src="/user.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="font-normal text-lg text-neutral-700">
                        {blog.author}
                      </div>
                    </div>
                    <div className="text-3xl font-bold">{blog.title}</div>
                    <div className="-mt-2">{blog.subtitle}</div>
                    <div className="flex flex-row gap-6 items-center">
                      <div className="flex flex-row gap-2 items-center">
                        <Heart
                          color="red"
                          fill={
                            user && blog.likes?.includes(user._id)
                              ? "red"
                              : "none"
                          }
                        />
                        <div>{blog.likes?.length || 0}</div>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <MessageCircle color="green" />
                        <div>{blog.comments?.length || 0}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
