/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { BlogContext } from "../contexts/BlogContext";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import { UserContext } from "@/contexts/UserContext";
import { CommentSidebar } from "@/components/CommentSidebar";
const BlogPage = () => {
  const { user } = useContext(UserContext) || { user: null };
  const blogContext = useContext(BlogContext);

  if (!blogContext) {
    throw new Error("BlogContext is not defined");
  }

  const { blog, fetchBlog, likeBlog, isLoading } = blogContext;

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchBlog(id);
    }
  }, [id]);

  const onLike = () => {
    if (blog) {
      console.log(blog);

      likeBlog(blog._id);
    }
  };

  return (
    <>
      {isLoading ? (
        <p className="text-lg h-screen flex items-center justify-center">
          Loading...
        </p>
      ) : (
        <>
          {blog && (
            <>
              <div className="w-full max-w-[800px] flex items-center justify-center">
                <div className="w-full flex flex-col py-10 gap-4">
                  <div className="text-4xl font-bold">{blog.title}</div>
                  <div className="text-lg font-medium text-neutral-500">
                    {blog.subtitle}
                  </div>
                  <div className="mt-2 flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-4 items-center justify-start">
                      <Avatar>
                        <AvatarImage src="/user.png" className="opacity-50" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <p className="text-lg">{blog.author}</p>
                    </div>
                    <div className="flex flex-row gap-6 items-center">
                      <div className="flex flex-row gap-2 items-center">
                        <Heart
                          color="red"
                          fill={
                            user && blog.likes?.includes(user._id)
                              ? "red"
                              : "none"
                          }
                          onClick={onLike}
                          className="cursor-pointer"
                        />
                        <div>{blog.likes?.length || 0}</div>
                      </div>
                      <CommentSidebar comments={blog.comments} />
                    </div>
                  </div>
                  {blog.imageUrl && (
                    <img
                      className="w-full h-[300px] object-cover"
                      src={blog.imageUrl}
                    />
                  )}
                  <div className="mt-4 text-lg text-neutral-700">
                    {blog.content}
                  </div>
                  <h1 className="text-2xl font-bold mt-10">Comments</h1>
                  <div className="mt-5 flex flex-col gap-4">
                    {blog.comments?.map((comment: any) => (
                      <div
                        key={comment._id}
                        className="border border-neutral-200 rounded-lg p-4"
                      >
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex flex-row gap-4 items-center justify-start">
                            <Avatar>
                              <AvatarImage src="/user.png" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-lg">{comment.user.username}</p>
                          </div>
                        </div>
                        <div className="mt-4 text-lg text-neutral-700">
                          {comment.comment}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default BlogPage;
