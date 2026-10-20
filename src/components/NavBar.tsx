import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";

const navigationRoutes = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About us" },
  { path: "/events", name: "Events" },
  { path: "/resources", name: "Resources" },
  { path: "/contact", name: "Contact" },
];

type NavBarProps = {
  className?: string;
};

export default function NavBar({ className = "" }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`flex items-center justify-center px-4 md:px-8 py-4 min-h-16 bg-transparent ${className}`}
    >
      {/* Desktop Navigation */}
      <div className="container hidden md:flex items-center justify-between h-full">
        <div className="flex items-center gap-8">
          <Link to="/" className="brand flex gap-2 items-center">
            <img
              src="/logo.png"
              alt="one_desire_foundation logo"
              width={50}
              height={50}
              className="rounded-xs"
            />
            <h5 className="text-2xl font-medium text-dark-red">
              One Desire Foundation
            </h5>
          </Link>

          <nav className="flex items-center gap-4" aria-label="Main navigation">
            {navigationRoutes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary-red font-semibold rounded-xs px-2 py-1"
                    : "text-dark-red hover:text-accent-red transition-colors rounded-xs px-2 py-1"
                }
              >
                {route.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="donate flex">
          <Link to="/donate">
            <Button
              size="lg"
              className="bg-dark-red hover:bg-primary-red hover:cursor-pointer text-white rounded-xs px-6 py-4"
            >
              Donate Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="container flex items-center justify-between md:hidden">
        <Link to="/" className="brand flex items-center gap-2">
          <img
            src="/logo.png"
            alt="one_desire_foundation logo"
            width={30}
            height={30}
            className="rounded-xs"
          />
          <p className="text-lg font-medium text-dark-red">
            One Desire Foundation
          </p>
        </Link>

        <div className="flex items-center justify-end">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-dark-red hover:bg-zinc-100/80 hover:text-dark-red rounded-xs"
                  aria-label="Toggle Menu"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              }
            />

            <SheetContent side="right" className="w-[280px] p-6 rounded-xs flex flex-col justify-between">
              <div>
                <SheetHeader className="text-left pb-4 mb-4 border-b border-zinc-100">
                  <SheetTitle className="text-lg font-bold text-dark-red">
                    Menu
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-2">
                  {navigationRoutes.map((route) => (
                    <NavLink
                      key={route.path}
                      to={route.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `px-3 py-2 text-base rounded-xs transition-colors ${
                          isActive
                            ? "bg-emerald-50 text-primary-red font-semibold"
                            : "text-dark-red hover:bg-zinc-100 hover:text-accent-red"
                        }`
                      }
                    >
                      {route.name}
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* Mobile Donate Button */}
              <div className="pt-4 border-t border-zinc-100">
                <Link to="/donate" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-dark-red hover:bg-primary-red text-white rounded-xs py-3">
                    Donate Now
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}