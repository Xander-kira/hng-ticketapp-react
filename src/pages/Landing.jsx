import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="relative bg-[#0a0c1a] text-white overflow-hidden">
      {/*  HERO SECTION  */}
      <section className="relative pt-20 pb-28 md:pt-28 md:pb-40">
        {/* INTENSE GLOW / BRAND ORB */}
        <div
          className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full blur-[120px] opacity-70 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(80,80,255,0.9) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
        <div
          className="absolute top-10 right-[-100px] w-[360px] h-[360px] rounded-full blur-[110px] opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.7) 0%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* CUSTOM LAYERED WAVES AT BOTTOM */}
        <div className="absolute inset-x-0 bottom-0 h-48 md:h-56 overflow-hidden pointer-events-none">
          {/* back wave (darker) */}
          <svg
            className="absolute inset-x-0 bottom-0 w-full h-full text-[#0b0f2e]"
            preserveAspectRatio="none"
            viewBox="0 0 1440 320"
            fill="currentColor"
          >
            <path d="M0,192L30,202.7C60,213,120,235,180,240C240,245,300,235,360,192C420,149,480,75,540,53.3C600,32,660,64,720,96C780,128,840,160,900,170.7C960,181,1020,171,1080,176C1140,181,1200,203,1260,213.3C1320,224,1380,224,1410,224L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"/>
          </svg>

          {/* front wave (accent color) */}
          <svg
            className="absolute inset-x-0 bottom-0 w-full h-full text-[rgb(58,69,255)]/40"
            preserveAspectRatio="none"
            viewBox="0 0 1440 320"
            fill="currentColor"
          >
            <path d="M0,288L30,272C60,256,120,224,180,218.7C240,213,300,235,360,218.7C420,203,480,149,540,149.3C600,149,660,203,720,229.3C780,256,840,256,900,250.7C960,245,1020,235,1080,202.7C1140,171,1200,117,1260,112C1320,107,1380,149,1410,170.7L1440,192L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"/>
          </svg>
        </div>

        {/* CONTENT CONTAINER (max width 1440px rule) */}
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-8">
          <div className="max-w-2xl">
            {/* Headline */}
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
              TicketApp Support Desk
            </h1>

            {/* Subtext */}
            <p className="text-gray-300 text-base md:text-lg mt-4 leading-relaxed">
              Centralize issues. Track status. Close faster. Rebuild this entire app
              in React, Vue, and Twig with the exact same layout and rules prove
              you’re not just copying tutorials.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                to="/auth/login"
                className="inline-flex items-center justify-center font-medium
                           bg-[rgb(80,80,255)] hover:bg-[rgb(100,100,255)]
                           text-white rounded-lg px-5 py-3 text-sm md:text-base
                           shadow-[0_20px_60px_rgba(80,80,255,0.4)]"
              >
                Log in
              </Link>

              <Link
                to="/auth/signup"
                className="inline-flex items-center justify-center font-medium
                           bg-[#0f172a] hover:bg-[#1e253d] text-white
                           border border-[rgb(80,80,255)]
                           rounded-lg px-5 py-3 text-sm md:text-base
                           shadow-[0_20px_60px_rgba(0,212,255,0.2)]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/*  FEATURE CARDS / VALUE PROP  */}
      <section className="relative bg-[#050713] py-16 border-t border-[#1a1f3d]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8">
          <h2 className="text-xl font-semibold text-white mb-8">
            Why teams use TicketApp
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="bg-[#0f172a]/70 border border-[rgba(80,80,255,0.4)] rounded-xl shadow-[0_30px_80px_rgba(80,80,255,0.15)] p-5">
              <h3 className="text-white font-medium text-lg">
                Fast ticket triage
              </h3>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                Create, edit, assign, and close tickets instantly. Required
                fields and inline errors prevent bad data.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0f172a]/70 border border-[rgba(0,212,255,0.4)] rounded-xl shadow-[0_30px_80px_rgba(0,212,255,0.15)] p-5">
              <h3 className="text-white font-medium text-lg">
                Protected dashboard
              </h3>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                Dashboard & Tickets only load if you have a valid session token
                in localStorage. Otherwise you’re bounced to Login.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0f172a]/70 border border-[rgba(148,163,184,0.4)] rounded-xl shadow-[0_30px_80px_rgba(148,163,184,0.15)] p-5">
              <h3 className="text-white font-medium text-lg">
                One design. Three frameworks.
              </h3>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                You’ll recreate THIS layout in React, Vue, and Twig with the
                same spacing, same glow blobs, same wave, same 1440px container.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER  */}
      <footer className="bg-[#050713] border-t border-[#1a1f3d] py-8 text-gray-400 text-sm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-center md:text-left">
            TicketApp • HNG Stage 2 • Frontend Track
          </p>
          <p className="text-center md:text-right text-gray-500">
            React + Tailwind v4 • localStorage auth
          </p>
        </div>
      </footer>
    </main>
  );
}
