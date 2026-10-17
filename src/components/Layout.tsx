import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <div className="h-dvh">
      <NavBar />

      <main className="px-8 py-4 flex w-full items-center justify-center">
        <Outlet />
      </main>

      <footer className=""></footer>
    </div>
  );
}
