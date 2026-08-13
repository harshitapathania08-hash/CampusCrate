import { Link } from "react-router-dom";

function HomeNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#CEE5ED]/90 backdrop-blur-md">

      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8">

        {/* Logo */}

        <Link
          to="/"
          className="text-3xl font-bold text-[#1E3A8A]"
        >
          CampusCrate
        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-10 text-[16px] font-medium text-[#111827] lg:flex">

<a
  href="#home"
  className="transition hover:text-[#1E3A8A]"
>
  Home
</a>

<a
  href="#features"
  className="transition hover:text-[#1E3A8A]"
>
  Features
</a>

<a
  href="#about"
  className="transition hover:text-[#1E3A8A]"
>
  About
</a>

<a
  href="#contact"
  className="transition hover:text-[#1E3A8A]"
>
  Contact
</a>

</nav>

        {/* Buttons */}

        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="font-semibold text-[#1E3A8A] transition hover:text-[#17317A]"
          >
            Login
          </Link>

          <Link
  to="/signup"
  className="rounded-xl bg-[#1E3A8A] px-4 py-1 font-semibold !text-white transition hover:bg-[#17317A]"
>
  Sign Up
</Link>

        </div>

      </div>

    </header>
  );
}

export default HomeNavbar;