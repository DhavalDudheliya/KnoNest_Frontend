import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { BlogContext } from "@/contexts/BlogContext";

const CommentDrawer = () => {
  const blogContext = useContext(BlogContext);

  if (!blogContext) {
    throw new Error("BlogContext is not defined");
  }

  const [comment, setComment] = useState("");

  const { addCommentOnBlog, blog } = blogContext;

  const handleClick = async () => {
    try {
      if (blog && comment) {
        addCommentOnBlog(blog._id, comment);
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed right-0 mr-20 top-0 p-4 flex-col"
      )}
    >
      <div className="mt-10">
        <Label>Comment: </Label>
        <Input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className="mt-4" onClick={handleClick}>
          Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentDrawer;
