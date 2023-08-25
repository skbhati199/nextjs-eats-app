import Image from "next/image";
import { Avatar } from "../ui/avatar";
import { Edit } from "lucide-react";

const EditPrfilePic = () => {
  return (
    <div className="flex items-center w-full justify-center">
      <Avatar className="rounded-full relative w-36 h-36 p-4">
        <Image
          className="rounded-full border-4 border-yellow-600 shadow-md dark:border-yellow-400 p-1"
          fill
          alt="Logo"
          color="white"
          src="/placeholder.png"
        />
        <Edit
          className="w-8 h-8 rounded-full border border- 
          border-white/10 absolute bottom-2 right-2 darK:text-zinc-500 bg-white 
          dark:text-white dark:bg-secondary p-1"
          scale={2}
          size={24}
        />
      </Avatar>
    </div>
  );
};

export default EditPrfilePic;
