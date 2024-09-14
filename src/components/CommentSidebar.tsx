import { MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CommentDrawer from "./CommentDrawer";

interface Comment {
  user: string;
  text: string;
}

interface CommentSidebarProps {
  comments: Comment[];
}

export const CommentSidebar = ({ comments }: CommentSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex flex-row gap-2 items-center">
          <MessageCircle color="green" className="cursor-pointer" />
          <div>{comments?.length || 0}</div>
        </div>
      </SheetTrigger>
      <SheetContent className="p-0 z-[100]" side="right">
        <CommentDrawer />
      </SheetContent>
    </Sheet>
  );
};
