"use client";
import { Drawer } from "@material-tailwind/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AddressDialog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("edit");
  const [open, setOpen] = useState(Boolean(id)); // Initialize with a boolean value

    const handleOpen = (val) => {
        if (!val) {
            setOpen(false);
            router.push("/address");
        } else {
            setOpen(id);
        }
    };

  useEffect(() => {
    setOpen(id);
  }, [id]);

  const handleDelete = (addressId) => {
    console.log(addressId);
  };

  return (
    // <div className="left-0 right-0 z-50 absolute flex-col bg-transparent outline-none border-none bottom-2 space-y-4 px-2 flex items-center justify-center">
      
          <Drawer placement="bottom" open={open} onClose={()=>handleOpen(false)} className="absolute max-h-fit bg-transparent bottom-0 h-min flex flex-col  justify-end z-50">
            <div className="divide-y-2 cursor-pointer rounded-lg w-full bg-[#f6f6f6] shadow-md shadow-slate-400 flex flex-col items-center justify-center">
              <p
                onClick={() => router.push(`/address/${id}`)}
                className="w-full font-lato py-4 text-lg text-[#007AFF] text-center"
              >
                Edit
              </p>
              <p
                onClick={() => handleDelete(open)}
                className="text-[#FF3B2F] py-4 w-full font-lato text-lg text-center"
              >
                Delete
              </p>
            </div>
            <p
              onClick={() => handleOpen(false)}
              className="w-full py-4 cursor-pointer text-[#007AFF] mt-3 bg-white shadow-md shadow-slate-400 rounded-lg font-lato text-lg text-center"
            >
              Cancel
            </p>
          </Drawer>
      
    // {/* </div> */}
  );
}
