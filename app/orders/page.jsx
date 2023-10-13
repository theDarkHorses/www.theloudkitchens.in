import { ChevronLeft } from "lucide-react";
import Image from "next/image";import BackRoute from "../components/common/BackRoute";
;

export default function page() {
  return (
    <section className="">
      <header className="">
        <Image
          src="https://i.imgur.com/rHQ2DwY.jpg"
          className="w-screen"
          width={350}
          height={200}
          alt="restaurant"
        />
        <BackRoute/>
      </header>
    </section>
  )
}
