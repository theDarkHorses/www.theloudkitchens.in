import CuisineDrawer from "@/app/components/CuisineDrawer";

export default function layout({ children, menu }) {
  return (
    <>
      {children}
      {menu}
      <CuisineDrawer />
    </>
  );
}
