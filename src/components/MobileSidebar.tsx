import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

export const MobilesSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-black" />
      </SheetTrigger>
      <SheetContent className="p-0 z-[100]" side="right">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
