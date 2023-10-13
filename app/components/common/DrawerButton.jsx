"use client";
import React from "react";
import share from "../../../public/icons/share.svg";
import { IconButton, Drawer } from "@material-tailwind/react";
import Image from "next/image"; // Import Image from next/image

const DrawerButton = ({ str }) => {
  const [openBottom, setOpenBottom] = React.useState(false);

  const openDrawerBottom = () => setOpenBottom(true);
  const closeDrawerBottom = () => setOpenBottom(false);
  console.log(openBottom);

  return (
    <React.Fragment>
      <div
        className="flex font-lato text-xs text-[#808080] border-[1px] border-dashed border-[#808080] px-3 py-1 space-x-2 mt-3"
        onClick={openDrawerBottom}
      >
        <p>Explore</p>
        <Image src={share} height={9} width={9} alt="img" />
      </div>
      <Drawer
        placement="bottom"
        open={openBottom}
        onClose={closeDrawerBottom}
        className=" absolute bg-red-300 z-40 max- h-96 bottom-0 left-0 right-0 w-full"
      >
        <p>{str}</p>
      </Drawer>
    </React.Fragment>
  );
};

export default DrawerButton;
