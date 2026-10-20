import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-dark-red px-6 py-12 text-white sm:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
        <div className="max-w-sm">
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-3 text-lg font-semibold text-white"
          >
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white p-1.5">
              <img
                src="/logo.png"
                alt=""
                width={64}
                height={64}
                decoding="async"
                className="h-full w-full object-contain"
              />
            </span>
            <span>One Desire Foundation</span>
          </Link>
          <p className="text-sm leading-6 text-white">
            Standing beside individuals and families affected by sickle cell
            disease through support, education, and advocacy.
          </p>
        </div>

        <nav
          aria-label="About the foundation"
          className="flex flex-col items-start gap-3 text-sm"
        >
          <h2 className="mb-1 text-sm font-semibold text-white">
            The foundation
          </h2>
          <Link to="/about" className="text-white hover:text-white">
            About us
          </Link>
          <Link to="/about" className="text-white hover:text-white">
            Our mission
          </Link>
          <Link to="/about" className="text-white hover:text-white">
            What we do
          </Link>
        </nav>

        <nav
          aria-label="Explore the website"
          className="flex flex-col items-start gap-3 text-sm"
        >
          <h2 className="mb-1 text-sm font-semibold text-white">Explore</h2>
          <Link to="/events" className="text-white hover:text-white">
            Events
          </Link>
          <Link to="/resources" className="text-white hover:text-white">
            Resources
          </Link>
          <Link to="/contact" className="text-white hover:text-white">
            Contact us
          </Link>
        </nav>

        <div className="flex flex-col items-start gap-3 text-sm">
          <h2 className="mb-1 text-sm font-semibold text-white">Get involved</h2>
          <p className="max-w-xs text-white">
            Help us build a community where no one faces sickle cell disease
            alone.
          </p>
          <Link
            to="/donate"
            className="font-medium text-white underline underline-offset-4 hover:text-white"
          >
            Donate to support our work
          </Link>
          <Link
            to="/contact"
            className="font-medium text-white underline underline-offset-4 hover:text-white"
          >
            Volunteer or partner with us
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/20 pt-5 text-xs text-white">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white">
            © {new Date().getFullYear()} One Desire Foundation. All rights
            reserved.
          </p>
          <p className="text-white">
            Hope, unity, and support for every patient and family.
          </p>
        </div>
      </div>
    </footer>
  );
}
