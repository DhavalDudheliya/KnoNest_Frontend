import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useContext, useState } from "react";
import { BlogContext } from "@/contexts/BlogContext";

const AddBlogDialog = () => {
  const blogContext = useContext(BlogContext);

  if (!blogContext) {
    throw new Error("BlogContext is not defined");
  }

  const { addBlog } = blogContext;

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    content: "",
    imageUrl: "",
    auther: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const blogData = {
        title: formData.title,
        subtitle: formData.subTitle,
        content: formData.content,
        imageUrl: formData.imageUrl,
        author: formData.auther,
        _id: "",
        likes: [],
        comments: [],
      };
      addBlog(blogData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <span className="mr-1">
            <Plus />
          </span>
          Add Blog
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Blog</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                onChange={handleChange}
                value={formData.title}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subTitle" className="text-right">
                Subtitle
              </Label>
              <Input
                id="subTitle"
                className="col-span-3"
                onChange={handleChange}
                value={formData.subTitle}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Input
                id="content"
                className="col-span-3"
                onChange={handleChange}
                value={formData.content}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                className="col-span-3"
                onChange={handleChange}
                value={formData.imageUrl}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="auther" className="text-right">
                Auther
              </Label>
              <Input
                id="auther"
                className="col-span-3"
                onChange={handleChange}
                value={formData.auther}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button type="submit">Add Blog</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlogDialog;
