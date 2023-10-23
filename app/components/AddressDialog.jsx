"use client";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AddressDialog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("edit");
  const [open, setOpen] = useState(Boolean(id));

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



  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/address?edit=${id}`)
      router.refresh()
      setOpen(false)
    } catch (err) {
      console.log(err.message)
    }
  }


  return (
    <div onClick={() => handleOpen(false)} className={`left-0 right-0 top-0  z-50 absolute backdrop-brightness-90 duration-300 transition-all backdrop-blur-[1px]  flex-col bg-transparent outline-none border-none bottom-0 space-y-4  flex items-end justify-end ${open ? "translate-y-0 bg-opacity-100" : "translate-y-full bg-opacity-0"}`}>
      <div onClick={(e) => e.stopPropagation()} className={`shadow-2xl w-full bg-transparent transition-all delay-75 duration-300 rounded-t-lg overflow-hidden ${open ? "translate-y-0" : "translate-y-full"}`}>
        <div className="cursor-pointer w-full rounded-lg overflow-hidden  shadow-md bg-white shadow-slate-400 divide-y-2 flex flex-col items-center justify-center">

          <button
            onClick={() => router.push(`/address/${id}`)}
            className="w-full font-lato py-4 text-lg text-[#007AFF] rounded-b-none text-center bg-[#f6f6f6]"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(open)}
            className="text-[#FF3B2F] py-4 w-full rounded-t-none  font-lato text-lg text-center bg-[#f6f6f6]"
          >
            Delete
          </button>
        </div>
        <button
          onClick={() => handleOpen(false)}
          className="w-full py-4 cursor-pointer text-[#007AFF] mt-3 bg-white shadow-slate-400 rounded-lg font-lato text-lg text-center"
        >
          Cancel
        </button>
      </div>

    </div>
  );
}
