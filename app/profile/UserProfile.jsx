"use client"

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const UserProfile = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div className="bg-white shadow-lg shadow-gray-300 mt-6 mb-12 rounded-lg flex items-center py-5 px-2 space-x-2">
      {isLoading ? (
        <div className="animate-pulse w-full flex items-center">
          <div className="rounded-full bg-gray-200 h-20 w-20 aspect-square"></div>
          <div className="ml-4 space-y-2 mt- w-full">
            <div className="h-4 bg-gray-200 rounded w-1/2 "></div>
            <div className="h-4 bg-gray-200 rounded w-10/12"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="">
            <Image
              src={user?.imageUrl}
              height={72}
              width={72}
              alt="images"
              className="rounded-full"
            />
          </div>
          <div className="">
            <h3 className="font-raleway text-2xl font-bold">
              {user?.firstName} {user?.lastName}
            </h3>
            <h3 className="font-raleway text-sm text-primary">
              {user?.emailAddresses[0]?.emailAddress}{" "}
            </h3>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;