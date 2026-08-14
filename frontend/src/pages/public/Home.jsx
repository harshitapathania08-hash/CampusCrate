import heroImage from "../../assets/images/hero.jpeg";
import HomeNavbar from "../../components/layout/HomeNavbar";
import { FaSearch, FaExchangeAlt, FaShieldAlt, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#111827]">

      <HomeNavbar />

      <main>

        {/* =====================================================
            HERO SECTION
        ===================================================== */}

<section
  id="home"
  className="relative overflow-hidden bg-[#CEE5ED]"
>

          {/* Decorative background */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#1E3A8A]/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/40 blur-3xl" />

          <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 py-16 lg:px-10 lg:py-20">

            {/* LEFT SIDE */}

            <div className="w-full lg:w-[52%] lg:pr-12">

              <span className="inline-flex rounded-full bg-[#E9EEFF] px-5 py-2 text-sm font-semibold text-[#1E3A8A] shadow-sm">
                Smart Lost & Found Platform
              </span>

              <h1 className="mt-7 text-5xl font-bold leading-[1.05] tracking-tight text-[#111827] sm:text-6xl lg:text-7xl">

                Lost Something
                <br />

                <span className="text-[#1E3A8A]">
                  On Campus?
                </span>

              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-[#64748B]">
                CampusCrate helps students report, discover and recover
                lost belongings securely. Making campuses smarter,
                safer and better connected.
              </p>

              {/* Buttons */}

              <div className="mt-9 flex flex-wrap gap-4">

              <button
  onClick={() => navigate("/post-lost")}
  className="rounded-2xl bg-[#1E3A8A] px-7 py-4 font-semibold text-white shadow-lg shadow-[#1E3A8A]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#17317A]"
>
  Report Lost Item
</button>

<button
  onClick={() => navigate("/lost-items")}
  className="rounded-2xl border border-[#D8DCE6] bg-white px-7 py-4 font-semibold text-[#111827] shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-[#F8F8F8]"
>
  Browse Items
</button>

              </div>

              {/* Search */}

              <div className="mt-12 flex max-w-2xl overflow-hidden rounded-2xl border border-[#E7E2D9] bg-white shadow-lg shadow-[#1E3A8A]/5">

                <div className="flex w-14 items-center justify-center text-[#94A3B8]">
                  <FaSearch />
                </div>

                <input
                  type="text"
                  placeholder="Search for ID Card, Wallet, Laptop..."
                  className="h-16 min-w-0 flex-1 px-2 outline-none placeholder:text-[#94A3B8]"
                />

                <button
                  onClick={() =>
                    (window.location.href = "/lost-items")
                  }
                  className="bg-[#1E3A8A] px-7 font-semibold text-white transition hover:bg-[#17317A]"
                >
                  Search
                </button>

              </div>

            </div>


            {/* =====================================================
                RIGHT SIDE
            ===================================================== */}

            <div className="relative hidden h-[610px] w-[48%] items-center justify-end lg:flex">

              {/* Image */}

              <img
                src={heroImage}
                alt="Campus"
                className="absolute right-0 top-1/2 h-[570px] w-[88%] -translate-y-1/2 rounded-[2rem] object-cover shadow-2xl"
              />

              {/* Blue overlay */}

              <div className="absolute right-0 top-1/2 h-[570px] w-[88%] -translate-y-1/2 rounded-[2rem] bg-[#1E3A8A]/25 backdrop-blur-[2px]" />


              {/* Floating Cards */}

              <div className="relative z-10 flex w-full flex-col items-end gap-5 px-3">

                {/* Card 1 */}

                <div className="w-[88%] rounded-3xl border border-white/40 bg-white/80 p-7 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-x-2">

                  <p className="text-sm font-medium text-[#64748B]">
                    Campus Community
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-[#111827]">
                    10,000+
                  </h3>

                  <p className="mt-1 text-sm text-[#64748B]">
                    Students Connected
                  </p>

                </div>


                {/* Card 2 */}

                <div className="w-[88%] rounded-3xl border border-white/40 bg-white/80 p-7 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-x-2">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E9EEFF] text-[#1E3A8A]">
                      <FaShieldAlt />
                    </div>

                    <h3 className="text-xl font-semibold text-[#111827]">
                      Safe & Secure
                    </h3>

                  </div>

                  <p className="mt-4 leading-7 text-[#64748B]">
                    Verified reporting and secure ownership claims
                    help reunite students with their belongings.
                  </p>

                </div>


                {/* Card 3 */}

                <div className="w-[88%] rounded-3xl border border-white/40 bg-white/80 p-7 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-x-2">

                  <p className="text-sm font-medium text-[#64748B]">
                    Available 24/7
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-[#1E3A8A]">
                    Always Online
                  </h3>

                  <p className="mt-1 text-sm text-[#64748B]">
                    Report or search for items anytime.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            PROCESS SECTION
        ===================================================== */}

<section id="about" className="bg-[#FFFCF8] py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-10">

            <div className="mb-10 text-center">

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#1E3A8A]">
                Simple Process
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl">
                Find it. Report it. Recover it.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-lg text-[#64748B]">
                CampusCrate keeps the entire lost and found process
                simple for students.
              </p>

            </div>


            <div className="grid gap-6 md:grid-cols-3">

              {/* 01 */}

              <div className="group rounded-3xl border border-[#E8DFD3] bg-[#F7F3EC] p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E3A8A] text-lg font-bold text-white">
                  01
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Report an Item
                </h3>

                <p className="mt-3 leading-7 text-[#64748B]">
                  Quickly post details about something you lost
                  or found on campus.
                </p>

              </div>


              {/* 02 */}

              <div className="group rounded-3xl border border-[#E8DFD3] bg-[#F7F3EC] p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E3A8A] text-lg font-bold text-white">
                  02
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Browse & Connect
                </h3>

                <p className="mt-3 leading-7 text-[#64748B]">
                  Search through reports and connect directly
                  with students about an item.
                </p>

              </div>


              {/* 03 */}

              <div className="group rounded-3xl border border-[#E8DFD3] bg-[#F7F3EC] p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E3A8A] text-lg font-bold text-white">
                  03
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Recover Safely
                </h3>

                <p className="mt-3 leading-7 text-[#64748B]">
                  Use claims and messaging to help return the
                  item to its rightful owner.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            FEATURES SECTION
        ===================================================== */}

<section id="features" className="bg-[#F7F3EC] py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-10">

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <div>

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#1E3A8A]">
                  Built For Campus Life
                </p>

                <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                  Everything you need in one place
                </h2>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-[#64748B]">
                  From reporting an item to communicating with
                  another student, CampusCrate keeps everything
                  organized.
                </p>

              </div>

              <button
                onClick={() =>
                  (window.location.href = "/lost-items")
                }
                className="flex items-center gap-2 font-semibold text-[#1E3A8A] transition hover:gap-4"
              >
                Explore Items
                <FaArrowRight />
              </button>

            </div>


            <div className="mt-10 grid gap-6 md:grid-cols-3">

              {/* Smart Search */}

              <div className="rounded-3xl border border-[#E8DFD3] bg-[#FFFCF8] p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9EEFF] text-xl text-[#1E3A8A]">
                  <FaSearch />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Smart Search
                </h3>

                <p className="mt-3 leading-7 text-[#64748B]">
                  Quickly search reports by item name,
                  category or location.
                </p>

              </div>


              {/* Messaging */}

              <div className="rounded-3xl border border-[#E8DFD3] bg-[#FFFCF8] p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9EEFF] text-xl text-[#1E3A8A]">
                  <FaExchangeAlt />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Direct Messaging
                </h3>

                <p className="mt-3 leading-7 text-[#64748B]">
                  Communicate with students directly when
                  you've found a possible match.
                </p>

              </div>


              {/* Claims */}

              <div className="rounded-3xl border border-[#E8DFD3] bg-[#FFFCF8] p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9EEFF] text-xl text-[#1E3A8A]">
                  <FaShieldAlt />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Secure Claims
                </h3>

                <p className="mt-3 leading-7 text-[#64748B]">
                  Ownership claims provide a safer way to
                  verify and return belongings.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            CTA SECTION
        ===================================================== */}

<section id="contact" className="bg-[#0F172A] py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-10">

            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

              <div>

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#93C5FD]">
                  Make Your Campus Better Connected
                </p>

                <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
                  Lost something?
                  <br />
                  Start looking today.
                </h2>

                <p className="mt-4 text-lg text-slate-300">
                  Report your item or browse existing reports
                  from your campus community.
                </p>

              </div>


              <div className="flex flex-wrap gap-4">

                <button
                  onClick={() =>
                    (window.location.href = "/post-lost")
                  }
                  className="rounded-2xl bg-white px-7 py-4 font-semibold text-[#1E3A8A] transition duration-300 hover:-translate-y-1 hover:bg-[#F7F3EC]"
                >
                  Report Lost Item
                </button>

                <button
                  onClick={() =>
                    (window.location.href = "/lost-items")
                  }
                  className="rounded-2xl border border-slate-600 px-7 py-4 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:border-white"
                >
                  Browse Items
                </button>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#0F172A]">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-slate-700 px-6 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-10">

          <p>
            <span className="font-semibold text-white">
              CampusCrate
            </span>{" "}
            Lost & Found System
          </p>

          <p>
            © 2026 CampusCrate. Built for campus communities.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;