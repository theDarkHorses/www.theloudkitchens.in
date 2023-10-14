"use client";
import {  Drawer } from "@material-tailwind/react";
import Image from "next/image"; 
import { useState, Fragment } from "react";

const DrawerButton = () => {
  const [openBottom, setOpenBottom] = useState(false);

  const openDrawer = () => setOpenBottom(true);
  const closeDrawer = () => setOpenBottom(false);

  return (
    <Fragment>
      <div
        className="flex font-lato text-xs text-[#808080] border-b-[1px] border-dashed border-[#808080]  py-1 space-x-2 mt-3 relative"
        onClick={openDrawer}
      >
        <p>Explore</p>
        <Image src={"/icons/share.svg"} height={9} width={9} alt="img" />
      </div>
      <Drawer
        size={700}
        placement="bottom"
        open={openBottom}
        onClose={closeDrawer}
        className="border-t-0 no-scrollbar border-black  rounded-t-lg shadow-md shadow-red-800  overflow-y-scroll bg-app flex-1 z-[999999]"
      >
        <div className="p-2 bg-white pb-6 z-50">
          <Image
            src="https://i.imgur.com/rHQ2DwY.jpg"
            width={350}
            height={120}
            className="rounded-lg"
            alt="restaurant"
          />
          <div className="flex items-center pl-6 -mt-7 ">
            <Image
              src="https://i.imgur.com/3vjidlG.jpg"
              height={85}
              width={85}
              className="rounded-full border-white border-4"
              alt="name"
            />
            <div className="pt-5">
              <h3 className="font-raleway font-bold text-lg capitalize">
                Great Indian Thalis
              </h3>
              <h3 className="font-lato font-bold text-xs capitalize text-[#7c7c7c]">
                271 Followers
              </h3>
            </div>
          </div>
        </div>

        <h4 className="bg-white mt-4 font-lato text-[#666] text-sm px-6 py-6">
          ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
          deserunt adipisci pariatur eligendi aliquid, culpa rerum! Quae
          repellendus laudantium facere autem iste quos qui libero iusto
          sapiente, ab eius ullam quas aliquid numquam impedit perspiciatis
          provident enim tenetur distinctio nisi veritatis. Eos repellat non
          enim iusto porro. Sapiente iusto culpa mollitia quidem delectus quia
          veritatis ab repellat non. Iste doloremque vel modi corporis enim
          rerum autem, doloribus optio non quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Necessitatibus deserunt adipisci
          pariatur eligendi aliquid, culpa rerum! Quae repellendus laudantium
          facere autem iste quos qui libero iusto sapiente, ab eius ullam quas
          aliquid numquam impedit perspiciatis provident enim tenetur distinctio
          nisi veritatis. Eos repellat non enim iusto porro. Sapiente iusto
          culpa mollitia quidem delectus quia veritatis ab repellat non. Iste
          doloremque vel modi corporis enim rerum autem, doloribus optio non
          quos.
        </h4>
        <div className="bg-white flex justify-end flex-1 w-screen shadow-md shadow-black sticky bottom-0">
          <button className="py-3 px-5 bg-red-600 text-white rounded-lg mx-1 my-4">
            Follow Our Journey
          </button>
        </div>
      </Drawer>
    </Fragment>
  );
};

export default DrawerButton;
