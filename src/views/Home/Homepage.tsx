import heroImage from "@/assets/hero.webp";
import outreachImage from "@/assets/outreach.webp";
import schoolsImage from "@/assets/schools.webp";
import drivesImage from "@/assets/drives.webp";
import pintsImage from "@/assets/pints.webp";
import volunteersImage from "@/assets/volunteers.webp";
import missionBanner from "@/assets/mission.webp";
import enterpriseImage from "@/assets/enterprise.webp";
import ghanaBloodServiceImage from "@/assets/ghana_blood_service.webp";
import donatingGuy from "@/assets/donation.webp";
import norvatisImage from "@/assets/norvatis.webp";
import { Button } from "@/components/ui/button";
import { motion, animate, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  HandHeart,
  HeartPulse,
  Megaphone,
  UsersRound,
  Droplets,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "@/components/SectionTitle";

const impactValues = [
  {
    value: 15000,
    suffix: "+",
    label: "Estimated Direct Reach",
    image: outreachImage,
  },
  {
    value: 6,
    label: "Senior High Schools",
    image: schoolsImage,
  },
  {
    value: 8,
    label: "Blood Donation Drives",
    image: drivesImage,
  },
  {
    value: 400,
    suffix: "+",
    label: "Pints Mobilised",
    image: pintsImage,
  },
  {
    value: 50,
    suffix: "+",
    label: "Volunteers",
    image: volunteersImage,
  },
];

const partnerLogos = [enterpriseImage, ghanaBloodServiceImage, norvatisImage];

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

function CountUp({
  value,
  suffix = "",
  duration = 1.3,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const animation = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => animation.stop();
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {new Intl.NumberFormat("en-US").format(displayValue)}
      {suffix}
    </span>
  );
}

export default function Homepage() {
  // Each half must be wider than the viewport, so repeat the set several times,
  // then double it so the -50% shift loops seamlessly.
  const half = Array.from({ length: 4 }, () => partnerLogos).flat();
  const marqueeLogos = [...half, ...half];

  return (
    <>
      <div className="w-full max-w-full overflow-x-hidden flex flex-col gap-4">
        <section className="relative w-full overflow-hidden bg-transparent">
          <img
            src={heroImage}
            alt="Community members supporting a blood donation campaign"
            fetchPriority="high"
            decoding="async"
            className="block h-[calc(100vh-80px)] w-full object-cover object-center bg-transparent opacity-0 md:opacity-100"
          />

          {/* Outer Overlay: Centered on mobile, left-aligned on sm+ */}
          <div className="details absolute inset-0 z-20 flex items-center justify-center sm:justify-start px-6 sm:px-10 lg:px-24">
            <motion.div
              /* Text container: Centered items & text on mobile, left-aligned on sm+ */
              className="text flex max-w-xl flex-col items-center sm:items-start text-center sm:text-left gap-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h2
                className="font-medium text-2xl sm:text-3xl md:text-4xl"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              >
                Join the fight <br className="hidden sm:inline" />
                against Sickle Cell
              </motion.h2>

              <motion.p
                className="text-xs sm:text-sm"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                We are a community driven by hope, unity, and unwavering
                support. <br className="hidden sm:inline" /> Dedicated to
                standing beside every patient and family impacted{" "}
                <br className="hidden sm:inline" /> by sickle cell disease
              </motion.p>

              <motion.div
                /* Buttons container: Centered on mobile, left-aligned on sm+ */
                className="buttons flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <Button className="rounded-xs">
                  <Link to="/donate">Donate Now</Link>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center gap-2 rounded-xs"
                >
                  <Link to="/resources">Learn More</Link>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="impact flex flex-col w-full max-w-full items-center justify-between gap-6 px-4 py-8 sm:px-8 lg:px-12">
          <SectionTitle label="A Glance at our Impact" />

          {/* Responsive Grid Layout */}
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {impactValues.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="flex w-full"
              >
                <Card className="flex w-full items-center justify-center rounded-xs p-6">
                  <CardContent className="flex w-full flex-row items-center justify-center gap-4 text-center p-0!">
                    <img
                      src={item.image}
                      alt={item.label}
                      width={64}
                      height={64}
                      loading="lazy"
                      decoding="async"
                      className="h-16 w-16 shrink-0 object-contain"
                    />
                    <div className="detail flex flex-col items-start gap-1 text-left">
                      <h2 className="text-3xl font-semibold text-dark-red">
                        <CountUp value={item.value} suffix={item.suffix} />
                      </h2>
                      <p className="text-xs text-foreground/80">{item.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="w-full px-6 py-16 sm:px-10 lg:px-20 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl sm:mb-14">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.32em] text-foreground/60">
                What we do
              </p>
              <h2 className="mb-4 text-3xl font-semibold text-dark-red sm:text-4xl">
                Awareness into practical action
              </h2>
              <p className="text-foreground/75">
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
                  className="border-t border-foreground/15 py-7"
                >
                  <item.icon
                    aria-hidden="true"
                    className="mb-5 h-7 w-7 text-primary-red"
                    strokeWidth={1.7}
                  />
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm leading-6 text-foreground/70">
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="relative w-full items-center my-24 md:my-0">
          <img
            src={missionBanner}
            alt="Our mission to support people affected by sickle cell disease"
            loading="lazy"
            decoding="async"
            className="w-full object-cover hidden md:flex"
          />
          <div className="absolute inset-0 z-50 flex items-center justify-center sm:justify-end px-4 sm:px-10 lg:px-20">
            <motion.div
              /* Centered on mobile, right-aligned on tablet/desktop */
              className="details flex max-w-2xl flex-col gap-2 items-center text-center sm:items-end sm:text-right text-dark-red!"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h3
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                /* Smaller text on mobile (text-xl/2xl), original 3xl on desktop */
                className="font-semibold text-xl sm:text-2xl md:text-3xl"
              >
                What we seek to accomplish?
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                /* Compact text size (text-[11px] or text-xs) on mobile, text-sm on desktop */
                className="text-[11px] xs:text-xs sm:text-sm leading-snug sm:leading-normal"
              >
                At One Desire Foundation, our mission is to transform and
                elevate <br className="hidden sm:inline" />
                the quality of life for individuals and families impacted by{" "}
                <br className="hidden sm:inline" />
                sickle cell disease through comprehensive support, empowering{" "}
                <br className="hidden sm:inline" />
                education, and relentless advocacy. <br />
                <br /> We exist to rewrite the narrative surrounding this
                condition—shifting feelings of{" "}
                <br className="hidden sm:inline" />
                isolation into a deep sense of belonging, and vulnerability into{" "}
                <br className="hidden sm:inline" />
                enduring strength. From providing practical resources and{" "}
                <br className="hidden sm:inline" />
                compassionate care to dismantling stigma and driving equitable{" "}
                <br className="hidden sm:inline" />
                healthcare policy, our commitment spans every stage of the
                patient <br className="hidden sm:inline" />
                journey. <br />
                <br /> We operate on a simple, foundational truth: no one should{" "}
                <br className="hidden sm:inline" />
                ever have to fight this battle alone.
              </motion.p>

              <motion.div
                /* Centered on mobile, right-aligned on desktop */
                className="buttons flex items-center justify-center sm:justify-end gap-2"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <Link to="/about">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-primary-red hover:text-dark-red text-xs sm:text-sm"
                  >
                    About us
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="partners w-full overflow-hidden py-8 my-4 flex flex-col gap-4 mt-8 md:gap-6">
          <SectionTitle label="Our partners" />

          <div className="relative overflow-hidden">
            <motion.div
              className="partner-track flex w-max items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 100,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {marqueeLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex h-16 w-36 md:h-32 md:w-64 shrink-0 items-center justify-center p-2 mr-6"
                >
                  <img
                    src={logo}
                    alt={`partner-logo-${(index % partnerLogos.length) + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="w-full overflow-hidden px-5 py-8 sm:px-8 lg:py-10">
          <div className="relative mx-auto max-w-6xl">
            <div className="relative flex min-h-80 flex-col items-center justify-center overflow-hidden bg-neutral-900 px-5 py-14 text-center text-white sm:min-h-96 sm:px-10 lg:min-h-[28rem]">
              <img
                src={donatingGuy}
                alt="A person making a donation"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/35"
              />
              <motion.div
                className="relative z-10 flex flex-col items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.16 },
                  },
                }}
              >
                <motion.p
                  className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-white/70"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  Take action
                </motion.p>
                <motion.h2
                  className="mb-5 text-3xl font-semibold text-white sm:text-4xl"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  Join our action!
                  <br />
                  Everyone can help.
                </motion.h2>
                <motion.div
                  className="flex flex-wrap justify-center gap-3"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Link to="/donate">
                    <Button className="bg-primary-red text-white hover:bg-dark-red">
                      Donate now
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button className="bg-white text-dark-red hover:bg-white/90">
                      Become a volunteer
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
