import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Droplets,
  Megaphone,
  HandHeart,
  HeartPulse,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutHeroImage from "@/assets/about_hero.png";
import volunteersImage from "@/assets/volunteers.webp";
import enterpriseImage from "@/assets/enterprise.webp";
import ghanaBloodServiceImage from "@/assets/ghana_blood_service.webp";
import norvatisImage from "@/assets/norvatis.webp";

export default function About() {
  useEffect(() => {
    document.title = "About Us | One Desire Sickle Cell Foundation";
  }, []);
  const whatWeDo = [
    {
      title: "Education",
      description:
        "Share clear, practical information that builds understanding of sickle cell disease.",
      icon: BookOpen,
    },
    {
      title: "Screening",
      description:
        "Promote screening and informed health decisions through community outreach.",
      icon: HeartPulse,
    },
    {
      title: "Blood donor mobilisation",
      description:
        "Bring communities together to support blood donation and patients who need it.",
      icon: Droplets,
    },
    {
      title: "Community support",
      description:
        "Stand alongside individuals and families affected by sickle cell disease.",
      icon: HandHeart,
    },
    {
      title: "Partnerships",
      description:
        "Work with schools, health services, and organisations to extend our impact.",
      icon: UsersRound,
    },
    {
      title: "Advocacy",
      description:
        "Raise awareness and advocate for better understanding, care, and change.",
      icon: Megaphone,
    },
  ];

  const fastFacts = [
    { number: "15,000+", label: "Estimated Direct Reach", subtext: "Across schools, communities & digital activations" },
    { number: "6", label: "Senior High Schools", subtext: "Interactive youth dialogues on genotype & care" },
    { number: "8", label: "Blood Donation Drives", subtext: "Organised within an 11-month active cycle" },
    { number: "400+", label: "Pints of Blood Mobilised", subtext: "In direct partnership with National Blood Service" },
    { number: "50+", label: "Dedicated Volunteers", subtext: "Youth ambassadors & healthcare advocates" },
    { number: "100%", label: "Youth-Led & Purpose-Driven", subtext: "Founded in Ghana to transform sickle cell care" },
  ];

  const partners = [
    {
      name: "Enterprise Life",
      logo: enterpriseImage,
      website: "https://mobilife.enterprisegroup.net.gh/",
    },
    {
      name: "National Blood Service Ghana",
      logo: ghanaBloodServiceImage,
      website: "https://nbs.gov.gh/",
    },
    { name: "Novartis", logo: norvatisImage, website: "https://www.novartis.com" },
  ];

  return (
    <div className="w-full flex flex-col bg-[#faf9f6] text-slate-900 selection:bg-primary-red/15 selection:text-dark-red">
      {/* 1. HERO SECTION (ONE-SIDED LAYOUT MATCHING HOMEPAGE) */}
      <section className="relative w-full overflow-hidden bg-transparent">
        <img
          src={aboutHeroImage}
          alt="A sickle cell advocate representing the people supported by One Desire Foundation"
          fetchPriority="high"
          decoding="async"
          className="block h-[calc(100vh-80px)] w-full object-cover object-center bg-transparent"
        />

        {/* Soft gradient overlay on the left for text legibility */}
        {/* <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#a3d3cf]/95 via-[#a3d3cf]/70 to-transparent sm:from-[#a3d3cf]/90 sm:via-[#a3d3cf]/50 sm:to-transparent pointer-events-none"
        /> */}

        {/* Outer Overlay: Centered on mobile, left-aligned on sm+ (matching Homepage) */}
        <div className="details absolute inset-0 z-20 flex items-center justify-center sm:justify-start px-6 sm:px-10 lg:px-24">
          <motion.div
            /* Text container: Centered items & text on mobile, left-aligned on sm+ */
            className="text flex max-w-xl flex-col items-center sm:items-start text-center sm:text-left gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              className="text-xs uppercase tracking-[0.25em] font-semibold text-primary-red"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease: "easeOut" }}
            >
              About One Desire
            </motion.span>

            <motion.h1
              className="font-serif font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-tight"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              Transforming sickle cell <br className="hidden sm:inline" />
              care across Ghana
            </motion.h1>

            <motion.p
              className="text-xs sm:text-sm md:text-base text-slate-800 leading-relaxed font-light"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              We are a youth-led movement turning sickle cell awareness into practical, life-saving action. Standing beside every warrior and family through education, screening, and voluntary blood donor mobilisation.
            </motion.p>

            <motion.div
              /* Buttons container: Centered on mobile, left-aligned on sm+ */
              className="buttons flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <Button className="rounded-xs bg-dark-red hover:bg-primary-red text-white">
                <Link to="/donate">Support Our Mission</Link>
              </Button>

              <Button
                variant="ghost"
                className="flex items-center gap-2 rounded-xs text-dark-red hover:text-primary-red hover:bg-white/60"
              >
                <a href="#story" className="flex items-center gap-2">
                  <span>Discover Our Story</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. EDITORIAL MANIFESTO STATEMENT (ONE MEDICAL STYLE) */}
      <section id="story" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-slate-900 leading-snug">
            One Desire Sickle Cell Foundation is on a mission to transform how Ghana understands, prevents, and responds to sickle cell disease through comprehensive support, empowering education, and relentless advocacy.
          </p>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Established in September 2024, the Foundation was created around a simple truth: awareness is most valuable when it leads to an informed, practical next step. We move people from merely hearing about sickle cell disease to knowing their genotype status, donating blood, accessing compassionate care, and fighting stigma together.
          </p>
        </div>
      </section>

      {/* 3. ALTERNATING MEDIA/STORY BLOCKS (ONE MEDICAL SIGNATURE LAYOUT) */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#faf9f6] space-y-20 lg:space-y-32">

        {/* Block 2: Leadership - Meet Our Team */}
        <div className="max-w-6xl mx-auto w-full space-y-12 py-4">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] bg-red-50 text-primary-red border border-red-100">
              LEADERSHIP
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Meet Our <span className="text-primary-red">Team</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              Learn about the visionaries and sickle cell advocates leading One Desire Foundation in Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
            {/* Card 1: David Akande */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center justify-between">
              <div>
                <div className="relative mb-5 inline-block">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-red-100 shadow-xs mx-auto">
                    <img
                      src="/images/founder.jpg"
                      alt="David Akande - Founder of One Desire Sickle Cell Foundation"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-dark-red text-white shadow-xs whitespace-nowrap">
                    FOUNDER
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-slate-900 mt-2">
                  David Akande
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-primary-red mt-1">
                  Sickle Cell Warrior & Advocate
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 max-w-xs mx-auto">
                  A sickle cell warrior who established One Desire Foundation in September 2024 to raise awareness, fight stigma, and support individuals and families affected by sickle cell disease across Ghana.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 mt-6 pt-4 border-t border-slate-100 w-full">
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-red-50/70 text-slate-700 border border-red-100/60">
                  Founded Sept 2024
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-red-50/70 text-slate-700 border border-red-100/60">
                  Patient Advocacy
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-red-50/70 text-slate-700 border border-red-100/60">
                  Youth Empowerment
                </span>
              </div>
            </div>

            {/* Card 2: Vanessa Oparebea Akuffo */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center justify-between">
              <div>
                <div className="relative mb-5 inline-block">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-red-100 shadow-xs mx-auto">
                    <img
                      src="/images/co_founder.jpg"
                      alt="Vanessa Oparebea Akuffo - Co-Founder of One Desire Sickle Cell Foundation"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-dark-red text-white shadow-xs whitespace-nowrap">
                    CO-FOUNDER
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-slate-900 mt-2">
                  Vanessa Oparebea Akuffo
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-primary-red mt-1">
                  Public Speaker & Brand Consultant
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 max-w-xs mx-auto">
                  A public speaker, corporate MC, and personal branding consultant with a strong background in finance and accounting, dedicated to amplifying the foundation's reach and institutional partnerships.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 mt-6 pt-4 border-t border-slate-100 w-full">
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-red-50/70 text-slate-700 border border-red-100/60">
                  Public Speaker
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-red-50/70 text-slate-700 border border-red-100/60">
                  Corporate MC
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-red-50/70 text-slate-700 border border-red-100/60">
                  Finance & Partnerships
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Block 3: Mission-Driven Leadership & Community (Image Left, Text Right) */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 bg-slate-100">
              <img
                src={volunteersImage}
                alt="One Desire Foundation volunteer community and healthcare team"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="lg:col-span-6 space-y-5 lg:pl-4">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary-red">
              Community & Leadership
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 leading-tight">
              A youth-led movement turning compassion into enduring impact
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              One Desire is powered by a community of over 50 dedicated volunteers, medical professionals, young advocates, and sickle cell warriors. We understand the lived realities of sickle cell disease first-hand—from the pain crises and hospital admissions to the social vulnerabilities.
            </p>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              We stand together on a simple foundational truth: no warrior and no family should ever have to fight this condition alone.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-dark-red font-semibold hover:text-primary-red transition-colors group text-base"
              >
                <span>Join our volunteer movement</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. IMPACT AT A GLANCE (DESIGN CONSISTENT WITH WHAT WE DO) */}
      <section className="w-full px-6 py-16 sm:px-10 lg:px-20 lg:py-24 bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl sm:mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-primary-red">
              Impact at a glance
            </p>
            <h2 className="mb-4 font-serif text-3xl font-medium text-dark-red sm:text-4xl lg:text-5xl">
              Measurable reach & practical action
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Tangible milestones achieved through community participation, clinical partnerships, and volunteer dedication across Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {fastFacts.map((fact, index) => (
              <motion.article
                key={fact.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="border-t border-slate-200 py-7"
              >
                <p className="mb-3 font-serif text-4xl sm:text-5xl font-medium text-primary-red tracking-tight">
                  {fact.number}
                </p>
                <h3 className="mb-2 font-serif text-xl font-medium text-slate-900">
                  {fact.label}
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  {fact.subtext}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHAT WE DO SECTION (MATCHING HOMEPAGE DESIGN) */}
      <section className="w-full px-6 py-16 sm:px-10 lg:px-20 lg:py-24 bg-[#faf9f6] border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl sm:mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-primary-red">
              What we do
            </p>
            <h2 className="mb-4 font-serif text-3xl font-medium text-dark-red sm:text-4xl lg:text-5xl">
              Awareness into practical action
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              We turn sickle cell awareness into meaningful support through
              education, community action, and advocacy.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {whatWeDo.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="border-t border-slate-200 py-7"
              >
                <item.icon
                  aria-hidden="true"
                  className="mb-5 h-7 w-7 text-primary-red"
                  strokeWidth={1.7}
                />
                <h3 className="mb-2 font-serif text-xl font-medium text-slate-900">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PARTNERS SECTION */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#faf9f6] border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-slate-500">
              Partnerships & Alliances
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-slate-900">
              Collaborating for Greater Healthcare Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center gap-3 h-36 hover:shadow-md transition-shadow"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  loading="lazy"
                />
                <span className="text-xs font-medium text-slate-600">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRE-FOOTER CALL TO ACTION (MATCHING ONE MEDICAL PREFOOTER) */}
      <section className="w-full py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-slate-900">
            Get involved with One Desire today
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Help us build a community where no warrior faces sickle cell disease alone. Whether through financial donation, voluntary blood giving, or volunteering your time, everyone can make a meaningful difference.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/donate"
              className="px-8 py-3.5 rounded-full bg-dark-red hover:bg-primary-red text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-300"
            >
              Donate to support warriors
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium text-sm sm:text-base shadow-xs hover:border-slate-400 transition-all duration-300"
            >
              Become a volunteer
            </Link>
          </div>

          <div className="pt-8 text-xs text-slate-500 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span>Legal Name: One Desire Sickle Cell Foundation LBG</span>
            <span>•</span>
            <span>Registration: CG025050426</span>
            <span>•</span>
            <span>TIN: C006715896X</span>
          </div>
        </div>
      </section>
    </div>
  );
}
