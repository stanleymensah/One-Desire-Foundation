import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="relative flex min-h-dvh w-full flex-col">
      <NavBar className="absolute z-30 right-0 left-0" />

      <main className="flex w-full flex-1 flex-col mb-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
