import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, animate, useInView } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Droplets,
  HeartPulse,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Info,
  Download,
  FileText,
  Thermometer,
  Apple,
  Pill,
  Hospital,
  Activity,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import educationHeroImage from "@/assets/education-hero.jpg";
import schoolsImage from "@/assets/schools.webp";
import patientsImage from "@/assets/patients-removebg-preview.webp";
import pintsImage from "@/assets/pints.webp";
import volunteersImage from "@/assets/volunteers-removebg-preview.webp";
import outreachImage from "@/assets/outreach.webp";
import donatingGuy from "@/assets/donation.webp";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from "@/components/SectionTitle";

type Genotype = "AA" | "AS" | "SS" | "AC" | "SC";

interface OutcomeOption {
  genotype: string;
  percent: number;
  category: "healthy" | "carrier" | "condition";
  description: string;
}

interface CompatibilityData {
  status: "Safe" | "Carrier Alert" | "High Risk" | "Critical Risk";
  statusVariant: "safe" | "warning" | "danger";
  headline: string;
  counseling: string;
  outcomes: OutcomeOption[];
}

const GENOTYPE_DATA: Record<string, CompatibilityData> = {
  "AA-AA": {
    status: "Safe",
    statusVariant: "safe",
    headline: "100% Chance of AA Offspring",
    counseling:
      "This combination carries zero risk of sickle cell disease or trait for future generations. All children will have normal hemoglobin (AA).",
    outcomes: [
      {
        genotype: "AA",
        percent: 100,
        category: "healthy",
        description: "Normal hemoglobin, no sickle cell trait or disease",
      },
    ],
  },
  "AA-AS": {
    status: "Safe",
    statusVariant: "safe",
    headline: "Zero Chance of Sickle Cell Disease",
    counseling:
      "Safe compatibility for family planning. There is a 50% chance a child will be a carrier (AS) and 50% chance of AA, but 0% risk of sickle cell disease.",
    outcomes: [
      {
        genotype: "AA",
        percent: 50,
        category: "healthy",
        description: "Normal hemoglobin",
      },
      {
        genotype: "AS",
        percent: 50,
        category: "carrier",
        description: "Healthy carrier of sickle cell trait",
      },
    ],
  },
  "AA-AC": {
    status: "Safe",
    statusVariant: "safe",
    headline: "Zero Chance of Sickle Cell Disease",
    counseling:
      "Safe combination. Children may inherit the C trait (carrier status) or normal hemoglobin, but no child will develop sickle cell disease.",
    outcomes: [
      {
        genotype: "AA",
        percent: 50,
        category: "healthy",
        description: "Normal hemoglobin",
      },
      {
        genotype: "AC",
        percent: 50,
        category: "carrier",
        description: "Healthy carrier of Hemoglobin C trait",
      },
    ],
  },
  "AA-SS": {
    status: "Safe",
    statusVariant: "safe",
    headline: "100% Carrier Offspring (0% Sickle Cell Disease)",
    counseling:
      "While none of the children will have sickle cell disease, all children will inherit the sickle cell trait (AS carriers). They will live healthy lives as carriers.",
    outcomes: [
      {
        genotype: "AS",
        percent: 100,
        category: "carrier",
        description: "Healthy carrier of sickle cell trait",
      },
    ],
  },
  "AA-SC": {
    status: "Safe",
    statusVariant: "safe",
    headline: "100% Carrier Offspring (0% Sickle Cell Disease)",
    counseling:
      "No child will have sickle cell disease. 50% of children will be AS carriers and 50% will be AC carriers.",
    outcomes: [
      {
        genotype: "AS",
        percent: 50,
        category: "carrier",
        description: "Healthy carrier of sickle cell trait",
      },
      {
        genotype: "AC",
        percent: 50,
        category: "carrier",
        description: "Healthy carrier of Hemoglobin C trait",
      },
    ],
  },
  "AS-AS": {
    status: "High Risk",
    statusVariant: "danger",
    headline: "25% Risk of Sickle Cell Disease (SS) in Every Pregnancy",
    counseling:
      "Medically high risk. In every pregnancy, there is a 1 in 4 (25%) chance of having a child with Sickle Cell Anemia (SS), 50% chance of AS carrier, and 25% chance of AA. Premarital genetic counselling is strongly advised.",
    outcomes: [
      {
        genotype: "AA",
        percent: 25,
        category: "healthy",
        description: "Normal hemoglobin",
      },
      {
        genotype: "AS",
        percent: 50,
        category: "carrier",
        description: "Carrier of sickle cell trait",
      },
      {
        genotype: "SS",
        percent: 25,
        category: "condition",
        description: "Sickle Cell Disease (HbSS Anemia)",
      },
    ],
  },
  "AS-AC": {
    status: "High Risk",
    statusVariant: "danger",
    headline: "25% Risk of Sickle Cell Disease (SC) in Every Pregnancy",
    counseling:
      "Medically high risk. In every pregnancy, there is a 25% chance of having a child with HbSC Sickle Cell Disease, which can cause severe pain crises and complications. Genetic counselling is essential.",
    outcomes: [
      {
        genotype: "AA",
        percent: 25,
        category: "healthy",
        description: "Normal hemoglobin",
      },
      {
        genotype: "AS",
        percent: 25,
        category: "carrier",
        description: "Carrier of sickle cell trait",
      },
      {
        genotype: "AC",
        percent: 25,
        category: "carrier",
        description: "Carrier of C trait",
      },
      {
        genotype: "SC",
        percent: 25,
        category: "condition",
        description: "Sickle Cell Disease (HbSC)",
      },
    ],
  },
  "AS-SS": {
    status: "Critical Risk",
    statusVariant: "danger",
    headline: "50% Risk of Sickle Cell Disease (SS) in Every Pregnancy",
    counseling:
      "Very high genetic risk. Each child has a 1 in 2 (50%) chance of being born with Sickle Cell Anemia (SS), and a 50% chance of being an AS carrier. Extensive professional medical counselling is critical.",
    outcomes: [
      {
        genotype: "AS",
        percent: 50,
        category: "carrier",
        description: "Carrier of sickle cell trait",
      },
      {
        genotype: "SS",
        percent: 50,
        category: "condition",
        description: "Sickle Cell Disease (HbSS Anemia)",
      },
    ],
  },
  "AS-SC": {
    status: "Critical Risk",
    statusVariant: "danger",
    headline: "50% Risk of Sickle Cell Disease (SS or SC) in Every Pregnancy",
    counseling:
      "Very high genetic risk. 50% of pregnancies carry the risk of sickle cell disease (25% SS, 25% SC). 50% will be carriers (AS or AC).",
    outcomes: [
      {
        genotype: "AS",
        percent: 25,
        category: "carrier",
        description: "Carrier of sickle cell trait",
      },
      {
        genotype: "AC",
        percent: 25,
        category: "carrier",
        description: "Carrier of C trait",
      },
      {
        genotype: "SS",
        percent: 25,
        category: "condition",
        description: "Sickle Cell Disease (HbSS)",
      },
      {
        genotype: "SC",
        percent: 25,
        category: "condition",
        description: "Sickle Cell Disease (HbSC)",
      },
    ],
  },
  "AC-AC": {
    status: "Carrier Alert",
    statusVariant: "warning",
    headline: "25% Risk of Hemoglobin C Disease (CC)",
    counseling:
      "This combination does not produce Sickle Cell Disease (SS/SC), but there is a 25% chance of Hemoglobin CC disease, which typically causes mild to moderate hemolytic anemia.",
    outcomes: [
      {
        genotype: "AA",
        percent: 25,
        category: "healthy",
        description: "Normal hemoglobin",
      },
      {
        genotype: "AC",
        percent: 50,
        category: "carrier",
        description: "Carrier of C trait",
      },
      {
        genotype: "CC",
        percent: 25,
        category: "condition",
        description: "Hemoglobin C Disease (mild anemia)",
      },
    ],
  },
  "AC-SS": {
    status: "High Risk",
    statusVariant: "danger",
    headline: "50% Risk of Sickle Cell Disease (SC)",
    counseling:
      "In every pregnancy, there is a 50% chance the child will have HbSC Sickle Cell Disease and 50% chance of being an AS carrier.",
    outcomes: [
      {
        genotype: "AS",
        percent: 50,
        category: "carrier",
        description: "Carrier of sickle cell trait",
      },
      {
        genotype: "SC",
        percent: 50,
        category: "condition",
        description: "Sickle Cell Disease (HbSC)",
      },
    ],
  },
  "AC-SC": {
    status: "High Risk",
    statusVariant: "danger",
    headline: "25% Risk of HbSC Sickle Cell Disease + 25% CC Disease",
    counseling:
      "There is a 25% chance of HbSC Sickle Cell Disease, 25% chance of CC Disease, and 50% chance of carrier status (AS or AC).",
    outcomes: [
      {
        genotype: "AS",
        percent: 25,
        category: "carrier",
        description: "Carrier of sickle cell trait",
      },
      {
        genotype: "AC",
        percent: 25,
        category: "carrier",
        description: "Carrier of C trait",
      },
      {
        genotype: "SC",
        percent: 25,
        category: "condition",
        description: "Sickle Cell Disease (HbSC)",
      },
      {
        genotype: "CC",
        percent: 25,
        category: "condition",
        description: "Hemoglobin C Disease",
      },
    ],
  },
  "SS-SS": {
    status: "Critical Risk",
    statusVariant: "danger",
    headline: "100% of Children Will Have Sickle Cell Anemia (SS)",
    counseling:
      "Both parents can only pass on the sickle hemoglobin gene (S). Every child will be born with Sickle Cell Disease (HbSS). Comprehensive specialist medical guidance is essential.",
    outcomes: [
      {
        genotype: "SS",
        percent: 100,
        category: "condition",
        description: "Sickle Cell Disease (HbSS Anemia)",
      },
    ],
  },
  "SS-SC": {
    status: "Critical Risk",
    statusVariant: "danger",
    headline: "100% of Children Will Have Sickle Cell Disease (SS or SC)",
    counseling:
      "All offspring will inherit sickle cell disease (50% HbSS and 50% HbSC). Medical counselling is strongly indicated.",
    outcomes: [
      {
        genotype: "SS",
        percent: 50,
        category: "condition",
        description: "Sickle Cell Disease (HbSS)",
      },
      {
        genotype: "SC",
        percent: 50,
        category: "condition",
        description: "Sickle Cell Disease (HbSC)",
      },
    ],
  },
  "SC-SC": {
    status: "Critical Risk",
    statusVariant: "danger",
    headline: "75% Risk of Sickle Cell Disease (SS or SC) in Every Pregnancy",
    counseling:
      "High genetic risk: 25% chance of SS, 50% chance of SC (total 75% Sickle Cell Disease) and 25% chance of CC disease.",
    outcomes: [
      {
        genotype: "SS",
        percent: 25,
        category: "condition",
        description: "Sickle Cell Disease (HbSS)",
      },
      {
        genotype: "SC",
        percent: 50,
        category: "condition",
        description: "Sickle Cell Disease (HbSC)",
      },
      {
        genotype: "CC",
        percent: 25,
        category: "condition",
        description: "Hemoglobin C Disease",
      },
    ],
  },
};

function getCompatibility(p1: Genotype, p2: Genotype): CompatibilityData {
  const directKey = `${p1}-${p2}`;
  if (GENOTYPE_DATA[directKey]) {
    return GENOTYPE_DATA[directKey];
  }
  const reverseKey = `${p2}-${p1}`;
  if (GENOTYPE_DATA[reverseKey]) {
    return GENOTYPE_DATA[reverseKey];
  }
  return {
    status: "Safe",
    statusVariant: "safe",
    headline: "Genetic Profile",
    counseling:
      "Please consult an accredited hematologist for clinical premarital counseling.",
    outcomes: [],
  };
}

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

const sickleCellStats = [
  {
    value: 25,
    suffix: "%",
    label: "Carrier Rate in Ghana (AS/AC)",
    image: patientsImage,
  },
  {
    value: 15000,
    suffix: "+",
    label: "Annual Newborn Screenings",
    image: schoolsImage,
  },
  {
    value: 400,
    suffix: "+",
    label: "Pints Transfused to Warriors",
    image: pintsImage,
  },
  {
    value: 100,
    suffix: "%",
    label: "Preventable via Awareness",
    image: volunteersImage,
  },
];

const resourceTopics = [
  {
    title: "Genotype Testing vs Sickling",
    description:
      "A simple sickling test is not enough. Learn why Hemoglobin Electrophoresis or HPLC is vital to accurately identify AS, AC, SS, or SC.",
    icon: HeartPulse,
  },
  {
    title: "Vaso-Occlusive Pain Crises",
    description:
      "Understand what triggers painful sickling episodes and how rapid hydration and warmth can prevent prolonged emergency hospitalisation.",
    icon: Activity,
  },
  {
    title: "Voluntary Blood Transfusions",
    description:
      "Why access to screened voluntary donor blood is an urgent necessity for warriors during aplastic crisis and surgical procedures.",
    icon: Droplets,
  },
  {
    title: "Daily Nutrition & Folic Acid",
    description:
      "Because red cells break down every 10-20 days, warriors need constant fuel, hydration, and daily folic acid to generate healthy new cells.",
    icon: Apple,
  },
  {
    title: "Temperature & Climate Care",
    description:
      "Sudden cold water baths or unventilated heat constrict blood vessels, trapping crescent cells. Learn essential protective habits.",
    icon: Thermometer,
  },
  {
    title: "Busting Cultural Stigma",
    description:
      "Sickle cell is an inherited genetic condition—not a spiritual curse or witchcraft. Knowledge and empathy restore dignity to warriors.",
    icon: BookOpen,
  },
];

const careProtocols = [
  {
    title: "1. Relentless Hydration",
    desc: "Drink 2.5 to 3.5 liters of clean water daily to prevent red blood cells from clumping in microvessels.",
    icon: Droplets,
  },
  {
    title: "2. Prescribed Folic Acid",
    desc: "Daily supplements support high bone-marrow cell turnover and protect against rapid hemolytic anemia.",
    icon: Pill,
  },
  {
    title: "3. Warmth (Never Ice)",
    desc: "Apply warm packs to aching joints. Never apply ice, as cold triggers severe vessel spasms and worsens pain.",
    icon: Thermometer,
  },
  {
    title: "4. Red Flag Hospital Signs",
    desc: "Immediate emergency attention is required for sudden fever (>38.5°C), acute chest pain, or shortness of breath.",
    icon: Hospital,
  },
];

export default function Resources() {
  useEffect(() => {
    document.title = "Resources & Education | One Desire Sickle Cell Foundation";
  }, []);

  const [partner1, setPartner1] = useState<Genotype>("AA");
  const [partner2, setPartner2] = useState<Genotype>("AS");

  const compatibility = getCompatibility(partner1, partner2);

  const genotypeOptions: { code: Genotype; label: string; desc: string }[] = [
    { code: "AA", label: "AA", desc: "Normal Hemoglobin" },
    { code: "AS", label: "AS", desc: "Sickle Cell Trait (Carrier)" },
    { code: "AC", label: "AC", desc: "Hemoglobin C Trait (Carrier)" },
    { code: "SS", label: "SS", desc: "Sickle Cell Anemia" },
    { code: "SC", label: "SC", desc: "Sickle-Hemoglobin C Disease" },
  ];

  return (
    <>
      <div className="w-full max-w-full overflow-x-hidden flex flex-col gap-4">
        {/* 1. HERO SECTION - AMAZON ONE MEDICAL EDITORIAL STYLE */}
        <section className="w-full bg-[#faf9f6] pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-24 px-5 sm:px-8 lg:px-20 border-b border-slate-200/50 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-12 items-center">
            {/* Left Column Content */}
            <motion.div
              className="md:col-span-7 flex flex-col items-start text-left gap-4 sm:gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.h1
                className="font-serif font-normal text-2xl xs:text-[1.75rem] sm:text-4xl md:text-[2.6rem] lg:text-5xl xl:text-6xl text-primary-red leading-[1.2] sm:leading-[1.12] tracking-tight break-words"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              >
                Comprehensive <br className="sm:hidden" />
                sickle cell care <br className="hidden sm:inline" />
                just got clearer
              </motion.h1>

              <motion.p
                className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-light max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              >
                Now young people, couples, and caregivers across Ghana can access evidence-based genotype compatibility calculators, crisis prevention guides, and community support resources.
              </motion.p>

              <motion.div
                className="pt-1 sm:pt-2 w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              >
                <a href="#calculator" className="block sm:inline-block w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="rounded-full bg-[#004f44] hover:bg-[#003830] text-white px-7 sm:px-8 py-5 sm:py-6 text-sm font-semibold shadow-xs w-full sm:w-auto"
                  >
                    Get Started
                  </Button>
                </a>
              </motion.div>

              {/* Sub-links matching Amazon One Medical microcopy */}
              <motion.div
                className="pt-1 sm:pt-2 space-y-1.5 text-xs text-slate-500 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <p>
                  <a href="#calculator" className="underline hover:text-dark-red">
                    *Check pre-marital genotype compatibility rules and risks.
                  </a>
                </p>
                <p>
                  Already know your status?{" "}
                  <a href="#topics" className="underline font-medium text-slate-700 hover:text-dark-red">
                    Follow these guidelines
                  </a>{" "}
                  to manage everyday health and prevent crisis.
                </p>
                <p>
                  Need school or community screening?{" "}
                  <Link to="/contact" className="underline font-medium text-slate-700 hover:text-dark-red">
                    Click here
                  </Link>
                  .
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column - Circular Mask with Curved Accent Stroke (One Medical Signature) */}
            <motion.div
              className="md:col-span-5 flex justify-center md:justify-end py-4 md:py-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-88 lg:h-88 xl:w-[400px] xl:h-[400px] mx-auto md:mx-0">
                {/* Decorative outer curved stroke line */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 sm:-inset-4 md:-inset-5 rounded-full border-[1.5px] border-primary-red/35 pointer-events-none -left-2.5 sm:-left-4 md:-left-6"
                />

                {/* Circular image mask */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-100 shadow-sm border-2 border-white">
                  <img
                    src={educationHeroImage}
                    alt="Open hematology textbooks and floating red blood cells"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. THREE-CARD EDITORIAL ROW - EXACT AMAZON ONE MEDICAL STYLE */}
        <section className="w-full py-10 sm:py-14 lg:py-16 px-4 sm:px-8 lg:px-20 bg-[#f0f7f6] border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: Screening */}
              <article className="flex flex-col gap-3 group">
                <div className="overflow-hidden rounded-2xl aspect-[16/10] bg-slate-200 shadow-xs">
                  <img
                    src={schoolsImage}
                    alt="Students in classroom learning about genotype testing"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#006654]">
                    GENOTYPE & SCREENING
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-slate-900 leading-snug group-hover:text-dark-red transition-colors">
                    Know your genotype, protect future generations
                  </h3>
                  <a
                    href="#calculator"
                    className="inline-flex items-center gap-1.5 py-1 text-sm font-semibold text-dark-red hover:text-primary-red touch-manipulation"
                  >
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </article>

              {/* Card 2: Crisis Care */}
              <article className="flex flex-col gap-3 group">
                <div className="overflow-hidden rounded-2xl aspect-[16/10] bg-slate-200 shadow-xs">
                  <img
                    src={outreachImage}
                    alt="One Desire care team assisting patient with health check"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#006654]">
                    WARRIOR WELLNESS
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-slate-900 leading-snug group-hover:text-dark-red transition-colors">
                    Managing pain crisis and daily hydration
                  </h3>
                  <a
                    href="#topics"
                    className="inline-flex items-center gap-1.5 py-1 text-sm font-semibold text-dark-red hover:text-primary-red touch-manipulation"
                  >
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </article>

              {/* Card 3: Blood Donation */}
              <article className="flex flex-col gap-3 group">
                <div className="overflow-hidden rounded-2xl aspect-[16/10] bg-slate-200 shadow-xs">
                  <img
                    src={donatingGuy}
                    alt="Voluntary blood donor giving blood for sickle cell patients"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#006654]">
                    BLOOD MOBILISATION
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-slate-900 leading-snug group-hover:text-dark-red transition-colors">
                    Finally, donor blood where it really counts
                  </h3>
                  <a
                    href="#downloads"
                    className="inline-flex items-center gap-1.5 py-1 text-sm font-semibold text-dark-red hover:text-primary-red touch-manipulation"
                  >
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 2. STATS SECTION - MATCHING HOMEPAGE IMPACT CARDS */}
        <section className="impact flex flex-col w-full max-w-full items-center justify-between gap-6 px-4 py-8 sm:px-8 lg:px-12">
          <SectionTitle label="Sickle Cell Facts in Ghana" />

          {/* Responsive Grid Layout */}
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sickleCellStats.map((item, index) => (
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
                <Card className="flex w-full items-center justify-center rounded-xs p-4 sm:p-6">
                  <CardContent className="flex w-full flex-row items-center justify-center gap-3 sm:gap-4 text-center p-0!">
                    <img
                      src={item.image}
                      alt={item.label}
                      width={64}
                      height={64}
                      loading="lazy"
                      decoding="async"
                      className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 object-contain"
                    />
                    <div className="detail flex flex-col items-start gap-0.5 sm:gap-1 text-left">
                      <h2 className="text-2xl sm:text-3xl font-semibold text-dark-red">
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

        {/* 3. INTERACTIVE GENOTYPE CALCULATOR (MATCHING HOMEPAGE TYPOGRAPHY & CARD DESIGN) */}
        <section
          id="calculator"
          className="w-full px-4 sm:px-8 lg:px-20 py-10 sm:py-16"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 sm:mb-10 max-w-2xl">
              <p className="mb-2 sm:mb-3 text-[11px] sm:text-xs font-medium uppercase tracking-[0.32em] text-foreground/60">
                Genetic compatibility
              </p>
              <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-dark-red">
                Know Your Status & Compatibility
              </h2>
              <p className="text-foreground/75 text-xs sm:text-sm md:text-base leading-relaxed">
                Select Partner 1 and Partner 2 genotypes to calculate the probability
                breakdown for every pregnancy and view clinical recommendations.
              </p>
            </div>

            <Card className="rounded-xs p-4 sm:p-7 lg:p-10 border border-foreground/15 shadow-none space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Partner 1 Selector */}
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-foreground/70">
                      Partner 1 Genotype
                    </p>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-xs bg-foreground/5 text-dark-red">
                      {partner1}
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {genotypeOptions.map((opt) => (
                      <button
                        key={`p1-${opt.code}`}
                        type="button"
                        onClick={() => setPartner1(opt.code)}
                        className={`min-h-[42px] sm:min-h-[46px] flex items-center justify-center py-2 sm:py-2.5 px-1 sm:px-2 rounded-xs text-center font-semibold text-xs sm:text-sm transition-all border ${
                          partner1 === opt.code
                            ? "bg-dark-red text-white border-dark-red shadow-xs"
                            : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10 border-foreground/10"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] sm:text-xs text-foreground/60 italic">
                    {genotypeOptions.find((o) => o.code === partner1)?.desc}
                  </p>
                </div>

                {/* Partner 2 Selector */}
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-foreground/70">
                      Partner 2 Genotype
                    </p>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-xs bg-foreground/5 text-primary-red">
                      {partner2}
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {genotypeOptions.map((opt) => (
                      <button
                        key={`p2-${opt.code}`}
                        type="button"
                        onClick={() => setPartner2(opt.code)}
                        className={`min-h-[42px] sm:min-h-[46px] flex items-center justify-center py-2 sm:py-2.5 px-1 sm:px-2 rounded-xs text-center font-semibold text-xs sm:text-sm transition-all border ${
                          partner2 === opt.code
                            ? "bg-primary-red text-white border-primary-red shadow-xs"
                            : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10 border-foreground/10"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] sm:text-xs text-foreground/60 italic">
                    {genotypeOptions.find((o) => o.code === partner2)?.desc}
                  </p>
                </div>
              </div>

              {/* Result Container */}
              <div className="border-t border-foreground/15 pt-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xs bg-foreground/5">
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">
                      Combination: {partner1} + {partner2}
                    </p>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-dark-red">
                      {compatibility.headline}
                    </h3>
                  </div>

                  <div className="self-start sm:self-auto">
                    {compatibility.statusVariant === "safe" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs text-xs font-semibold bg-emerald-100 text-emerald-800">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        {compatibility.status}
                      </span>
                    )}
                    {compatibility.statusVariant === "warning" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs text-xs font-semibold bg-amber-100 text-amber-800">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        {compatibility.status}
                      </span>
                    )}
                    {compatibility.statusVariant === "danger" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs text-xs font-semibold bg-red-100 text-red-800">
                        <ShieldAlert className="w-4 h-4 text-red-600" />
                        {compatibility.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Probability bars */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                    Offspring Probability Breakdown (Per Pregnancy)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {compatibility.outcomes.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xs border flex flex-col justify-between gap-2 ${
                          item.category === "healthy"
                            ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                            : item.category === "carrier"
                            ? "bg-blue-50/70 border-blue-200 text-blue-950"
                            : "bg-rose-50/80 border-rose-300 text-rose-950"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold font-mono">
                            {item.genotype}
                          </span>
                          <span className="text-base font-extrabold">
                            {item.percent}%
                          </span>
                        </div>
                        <p className="text-xs opacity-90 leading-snug">
                          {item.description}
                        </p>
                        <div className="w-full bg-white/70 h-2 rounded-xs overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-xs ${
                              item.category === "healthy"
                                ? "bg-emerald-500"
                                : item.category === "carrier"
                                ? "bg-blue-500"
                                : "bg-red-600"
                            }`}
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guidance note */}
                <div className="p-4 rounded-xs bg-foreground/5 border border-foreground/10 flex items-start gap-3">
                  <Info className="w-5 h-5 text-dark-red shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    {compatibility.counseling}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* 4. ESSENTIAL TOPICS - MATCHING HOMEPAGE "WHAT WE DO" GRID */}
        <section id="topics" className="w-full px-4 sm:px-8 lg:px-20 py-12 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 sm:mb-14 max-w-2xl">
              <p className="mb-2 sm:mb-3 text-[11px] sm:text-xs font-medium uppercase tracking-[0.32em] text-foreground/60">
                Educational foundation
              </p>
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold text-dark-red">
                What every Ghanaian should know
              </h2>
              <p className="text-foreground/75 text-xs sm:text-sm md:text-base leading-relaxed">
                Practical, evidence-based guidance to help individuals, students, and
                families make healthy, proactive decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-10">
              {resourceTopics.map((item, index) => (
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
                  className="border-t border-foreground/15 py-6 sm:py-7"
                >
                  <item.icon
                    aria-hidden="true"
                    className="mb-4 sm:mb-5 h-6 w-6 sm:h-7 sm:w-7 text-primary-red"
                    strokeWidth={1.7}
                  />
                  <h3 className="mb-2 text-base sm:text-lg font-semibold">{item.title}</h3>
                  <p className="text-xs sm:text-sm leading-6 text-foreground/70">
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. MANAGING CRISIS SECTION - AMAZON ONE MEDICAL EDITORIAL STYLE */}
        <section id="crisis-care" className="w-full bg-[#faf9f6] py-12 sm:py-16 lg:py-24 px-5 sm:px-8 lg:px-20 border-y border-slate-200/50 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-8 lg:gap-16 items-center">
            {/* Left Column: Signature Circular Visual Mask with Curved Stroke */}
            <motion.div
              className="md:col-span-5 flex justify-center md:justify-start order-2 md:order-1 py-4 md:py-0"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-88 lg:h-88 xl:w-[400px] xl:h-[400px] mx-auto md:mx-0">
                {/* Decorative outer curved accent ring */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 sm:-inset-4 md:-inset-5 rounded-full border-[1.5px] border-[#006654]/30 pointer-events-none -right-2.5 sm:-right-4 md:-right-6"
                />

                {/* Circular image mask */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-100 shadow-sm border-2 border-white">
                  <img
                    src={outreachImage}
                    alt="One Desire care team assisting warrior with health check"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Column: Editorial Text & Action */}
            <motion.div
              className="md:col-span-7 flex flex-col items-start text-left gap-4 sm:gap-5 order-1 md:order-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#006654]">
                WARRIOR WELLNESS & CRISIS DEFENSE
              </span>

              <h2 className="font-serif font-normal text-2xl xs:text-[1.75rem] sm:text-4xl md:text-[2.6rem] lg:text-5xl text-dark-red leading-[1.2] sm:leading-[1.12] tracking-tight break-words">
                Managing crisis <br className="sm:hidden" />
                & daily wellness <br className="hidden sm:inline" />
                with confidence
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-light max-w-xl">
                Sickle cell management is built on proactive daily defense. From continuous hydration and temperature regulation to rapid pain response and infection prevention, early care stops complications before they escalate.
              </p>

              <div className="pt-1 sm:pt-2 w-full sm:w-auto">
                <Link to="/contact" className="block sm:inline-block w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="rounded-full bg-[#004f44] hover:bg-[#003830] text-white px-7 sm:px-8 py-5 sm:py-6 text-sm font-semibold shadow-xs w-full sm:w-auto"
                  >
                    Connect with Our Care Team
                  </Button>
                </Link>
              </div>

              {/* Microcopy footnotes matching One Medical */}
              <div className="pt-1 sm:pt-2 space-y-1.5 text-xs text-slate-500 font-light">
                <p>
                  <a href="#crisis-protocols" className="underline hover:text-dark-red">
                    *Read the four pillars of everyday warrior wellness below.
                  </a>
                </p>
                <p>
                  Emergency warning: Sudden high fever, chest pain, or shortness of breath require immediate hospital emergency care.
                </p>
                <p>
                  Need community support or a hospital visit?{" "}
                  <Link to="/contact" className="underline font-medium text-slate-700 hover:text-dark-red">
                    Contact our advocates
                  </Link>
                  .
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 6. CARE PROTOCOLS & HOSPITAL RED FLAGS */}
        <section id="crisis-protocols" className="w-full px-4 sm:px-8 lg:px-20 py-12 sm:py-16 lg:py-20 bg-white">
          <div className="mx-auto max-w-7xl space-y-8 sm:space-y-12">
            <div className="max-w-2xl">
              <p className="mb-2 sm:mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#006654]">
                WARRIOR PROTOCOL
              </p>
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-dark-red">
                Four Pillars of Daily Care
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                Simple, actionable clinical steps that keep blood flowing freely and prevent painful vaso-occlusion.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {careProtocols.map((p, idx) => (
                <div key={idx} className="rounded-2xl p-5 sm:p-6 border border-slate-200/80 bg-[#faf9f6] space-y-2.5 sm:space-y-3 hover:shadow-xs transition-all">
                  <p.icon className="h-6 w-6 text-primary-red" />
                  <h3 className="font-serif font-semibold text-base sm:text-lg text-slate-900">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. DOWNLOADS SECTION (MATCHING HOMEPAGE EDITORIAL STYLE) */}
        <section id="downloads" className="w-full px-4 sm:px-8 lg:px-20 py-12 sm:py-16 bg-foreground/3">
          <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
            <div className="max-w-2xl">
              <p className="mb-2 sm:mb-3 text-[11px] sm:text-xs font-medium uppercase tracking-[0.32em] text-foreground/60">
                Official documents
              </p>
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold text-dark-red">
                Downloadable Resources
              </h2>
              <p className="text-foreground/75 text-xs sm:text-sm md:text-base leading-relaxed">
                Access official foundation reports, partnership briefs, and educational materials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card className="rounded-xs p-5 sm:p-6 border border-foreground/15 shadow-none flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-start sm:items-center gap-3">
                    <FileText className="w-6 h-6 text-primary-red shrink-0 mt-0.5 sm:mt-0" />
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base text-dark-red">
                        One Desire Foundation Profile (2024 - 2026)
                      </h3>
                      <p className="text-[11px] sm:text-xs text-foreground/60">
                        Official Impact, Governance & Partnership Profile • PDF (350 KB)
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    Comprehensive overview of our school reach, 8 blood donation drives, 400+ pints mobilised, and strategic model in Ghana.
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 pt-2">
                  <a
                    href="/documents/One-Desire-Sickle-Cell-Foundation-Profile.pdf"
                    download="One-Desire-Sickle-Cell-Foundation-Profile.pdf"
                    className="flex-1"
                  >
                    <Button className="w-full rounded-xs bg-dark-red hover:bg-primary-red text-white flex items-center justify-center gap-2 text-xs sm:text-sm">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </Button>
                  </a>
                  <a
                    href="/documents/One-Desire-Sickle-Cell-Foundation-Profile.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="rounded-xs border-foreground/20 text-foreground"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </Card>

              <Card className="rounded-xs p-5 sm:p-6 border border-foreground/15 shadow-none flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-start sm:items-center gap-3">
                    <Sparkles className="w-6 h-6 text-primary-red shrink-0 mt-0.5 sm:mt-0" />
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base text-dark-red">
                        School Outreach & Screening Bundles
                      </h3>
                      <p className="text-[11px] sm:text-xs text-foreground/60">
                        Educational Presentation Toolkit & Infographics
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    Request printed brochures, classroom presentation slides, and pre-screening materials for your senior high school or youth assembly.
                  </p>
                </div>

                <div className="pt-2">
                  <Link to="/contact">
                    <Button
                      variant="outline"
                      className="w-full rounded-xs border-foreground/20 text-dark-red hover:bg-foreground/5 flex items-center justify-center gap-2 text-xs sm:text-sm"
                    >
                      <span>Request Materials</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* 8. TAKE ACTION BANNER - EXACT HOMEPAGE STYLE */}
        <section className="w-full overflow-hidden px-4 sm:px-8 py-8 sm:py-10">
          <div className="relative mx-auto max-w-6xl">
            <div className="relative flex min-h-72 sm:min-h-80 md:min-h-96 lg:min-h-[28rem] flex-col items-center justify-center overflow-hidden bg-neutral-900 px-4 sm:px-10 py-10 sm:py-14 text-center text-white">
              <img
                src={donatingGuy}
                alt="Community member participating in a sickle cell campaign"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/45"
              />
              <motion.div
                className="relative z-10 flex flex-col items-center max-w-2xl"
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
                  className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-white/80"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  Join the movement
                </motion.p>
                <motion.h2
                  className="mb-5 text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  Turn awareness into action!
                  <br />
                  Together we can save lives.
                </motion.h2>
                <motion.div
                  className="flex flex-col sm:flex-row w-full sm:w-auto justify-center gap-3"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-primary-red text-white hover:bg-dark-red rounded-xs">
                      Request an outreach
                    </Button>
                  </Link>
                  <Link to="/donate" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-white text-dark-red hover:bg-white/90 rounded-xs">
                      Donate now
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
