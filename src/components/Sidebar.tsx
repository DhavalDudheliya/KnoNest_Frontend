import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  className?: string;
};

const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col justify-between",
        className
      )}
    >
      <div>
        <Link to="/">
          <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
            <h1 className="text-2xl font-extrabold">
              <span className="company-logo font-extrabold text-3xl">
                KnoNest
              </span>
            </h1>
          </div>
        </Link>
        <div className="flex flex-col gap-y-2 pl-4">
          <div className="text-lg">Logout</div>
        </div>
      </div>
      <div className="p-5">
        <Avatar>
          <AvatarImage src="/user.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Sidebar;
