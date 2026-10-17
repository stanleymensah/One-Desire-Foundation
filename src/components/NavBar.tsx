import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";

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
  return (
    <header
      className={`flex items-center justify-center px-8 py-4 min-h-16 bg-transparent ${className}`}
    >
      <div className="container flex items-center justify-between h-full">
        <div className="flex items-center gap-8">
          <div className="brand flex gap-2 items-center">
            <img
              src="/logo.png"
              alt="one_desire_foundation logo"
              width={50}
              height={50}
            />
            <h5 className="text-2xl font-medium text-dark-red">
              One Desire Foundation
            </h5>
          </div>

          <nav className="flex items-center gap-4" aria-label="Main navigation">
            {navigationRoutes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary-red font-semibold"
                    : "text-dark-red hover:text-accent-red transition-colors"
                }
              >
                {route.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="donate flex">
          <Link to="/donate" className="text-white">
            <Button
              size="lg"
              className="bg-dark-red hover:bg-primary-red hover:cursor-pointer rounded-xs px-6 py-4"
            >
              {" "}
              Donate Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
