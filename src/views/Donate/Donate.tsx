import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Droplets, HandHeart, Heart, Mail, UsersRound } from "lucide-react";
import volunteersImage from "@/assets/volunteers.webp";

const email = "info@onedesirefoundation.com";
const causes = [
  { icon: BookOpen, title: "Education & awareness", text: "Help bring conversations about genotype, sickle cell disease, and informed choices into schools and communities." },
  { icon: Droplets, title: "Blood donor mobilisation", text: "Support the outreach and community engagement behind our blood donation drives." },
  { icon: HandHeart, title: "Community support", text: "Help us stand beside individuals and families affected by sickle cell disease through support and advocacy." },
];
type DonationPayload = {
  email: string;
  amount: number; // Paystack expects GHS amounts in pesewas.
  currency: "GHS";
  metadata: {
    donor_name: string;
    donation_frequency: "one-time" | "monthly";
    message: string;
  };
};

const fieldClass = "w-full rounded-lg border border-slate-300 bg-white p-3 text-sm focus:outline-2 focus:outline-dark-red";

export default function Donate() {
  const [amount, setAmount] = useState("100");
  const [frequency, setFrequency] = useState<"One-time" | "Monthly">("One-time");
  const [prepared, setPrepared] = useState(false);

  useEffect(() => {
    document.title = "Donate | One Desire Sickle Cell Foundation";
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const amountInPesewas = Math.round(Number(amount) * 100);
    if (!Number.isSafeInteger(amountInPesewas) || amountInPesewas < 100) return;

    const payload: DonationPayload = {
      email: String(form.get("email") ?? "").trim(),
      amount: amountInPesewas,
      currency: "GHS",
      metadata: {
        donor_name: String(form.get("name") ?? "").trim(),
        donation_frequency: frequency === "Monthly" ? "monthly" : "one-time",
        message: String(form.get("message") ?? "").trim(),
      },
    };

    // Replace with payment initialization when Paystack is connected.
    // Monthly intent is metadata only; recurring billing needs subscription setup.
    console.log("Donation submission:", payload);
    setPrepared(true);
  }

  return (
    <div className="w-full bg-[#faf9f6] text-slate-900">
      <section className="px-5 pb-16 pt-36 sm:px-10 sm:pb-20 sm:pt-44 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-dark-red"><Heart size={16} aria-hidden="true" /> Give hope. Stand with warriors.</span>
            <h1 className="max-w-xl font-serif text-5xl font-medium leading-[1.08] text-slate-900 sm:text-6xl">A little kindness.<br />A lasting <span className="text-dark-red">difference.</span></h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">Help build a future where no one faces sickle cell disease alone. Your generosity supports education, blood donor mobilisation, and a stronger community in Ghana.</p>
            <figure className="mt-9 overflow-hidden rounded-2xl">
              <img src={volunteersImage} alt="One Desire Foundation volunteers coming together to support the community" className="aspect-[3/2] w-full object-cover" fetchPriority="high" />
              <figcaption className="border-b border-slate-200 py-4 text-sm text-slate-600">One community. One purpose. Every warrior matters.</figcaption>
            </figure>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-dark-red">Make a difference</span>
            <h2 className="mt-3 font-serif text-3xl text-slate-900">Support our work</h2>
            <p className="mt-3 text-sm text-slate-600">Choose your gift and enter your details to support our work.</p>
            <form onChange={() => setPrepared(false)} onSubmit={handleSubmit} className="mt-7 space-y-6">
              <fieldset>
                <legend className="mb-2 text-sm font-medium">How would you like to give?</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(["One-time", "Monthly"] as const).map((option) => <button key={option} type="button" aria-pressed={frequency === option} onClick={() => { setFrequency(option); setPrepared(false); }} className={`rounded-lg border px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red ${frequency === option ? "border-dark-red bg-dark-red text-white" : "border-slate-200 text-slate-600 hover:border-dark-red"}`}>{option}</button>)}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-2 text-sm font-medium">Choose an amount <span className="font-normal text-slate-500">(GHS)</span></legend>
                <div className="grid grid-cols-3 gap-2">
                  {["50", "100", "200"].map((value) => <button key={value} type="button" aria-pressed={amount === value} onClick={() => { setAmount(value); setPrepared(false); }} className={`rounded-lg border px-2 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red ${amount === value ? "border-dark-red bg-red-50 text-dark-red" : "border-slate-200 text-slate-700 hover:border-dark-red"}`}>GH₵ {value}</button>)}
                </div>
                <label htmlFor="donation-amount" className="mb-2 mt-4 block text-sm text-slate-600">Or enter your own amount (GHS)</label>
                <input id="donation-amount" name="amount" type="number" min="1" step="0.01" required value={amount} onChange={(event) => { setAmount(event.target.value); setPrepared(false); }} className={fieldClass} />
              </fieldset>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label htmlFor="donor-name" className="mb-2 block text-sm font-medium">Your name</label><input id="donor-name" name="name" autoComplete="name" required maxLength={100} pattern={".*\\S.*"} className={fieldClass} placeholder="Full name" /></div>
                <div><label htmlFor="donor-email" className="mb-2 block text-sm font-medium">Email address</label><input id="donor-email" name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClass} placeholder="you@example.com" /></div>
              </div>
              <div><label htmlFor="donor-message" className="mb-2 block text-sm font-medium">A note for our team <span className="font-normal text-slate-500">(optional)</span></label><textarea id="donor-message" name="message" rows={3} maxLength={1500} placeholder="Tell us how you would like to help" className={`${fieldClass} resize-y`} /></div>
              <button type="submit" className="flex w-full items-center justify-center gap-3 rounded-full bg-dark-red px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red">Donate now <ArrowRight size={17} aria-hidden="true" /></button>
              <p className="text-xs leading-5 text-slate-500">Online payments are coming soon. No payment is taken and no monthly subscription is started when you submit this form.</p>
              {prepared && <div role="status" className="rounded-lg bg-red-50 p-4 text-sm text-slate-700">Your donation details have been captured for this preview. Payments are not connected yet; no donation has been processed.</div>}
            </form>
          </div>
        </div>
      </section>
      <section className="border-y border-slate-200 bg-white px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-dark-red">The purpose behind your gift</span>
          <h2 className="mt-3 max-w-xl font-serif text-3xl text-slate-900 sm:text-4xl">More understanding.<br />More support. More hope.</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">{causes.map(({ icon: Icon, title, text }) => <article key={title} className="border-t border-slate-200 pt-6"><Icon className="mb-5 text-dark-red" size={28} strokeWidth={1.5} aria-hidden="true" /><h3 className="font-serif text-xl text-slate-900">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></article>)}</div>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-dark-red underline underline-offset-4">Get to know the foundation <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-10 sm:py-20 lg:px-0">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-dark-red">There is a place for everyone</span><h2 className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl">Other ways to give</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {[{ icon: Droplets, title: "Give blood", text: "Find out about upcoming blood donation drives and how to get involved.", to: "/events", link: "Explore our events" }, { icon: UsersRound, title: "Give your time", text: "Bring your skills and energy to our community as a volunteer.", to: "/contact", link: "Become a volunteer" }, { icon: HandHeart, title: "Partner with us", text: "Explore organisational partnerships, sponsorship, or in-kind support with our team.", to: "/contact", link: "Start a conversation" }].map(({ icon: Icon, title, text, to, link }) => <article key={title} className="flex flex-col items-start border-t border-slate-300 pt-6"><Icon size={24} className="mb-4 text-dark-red" aria-hidden="true" /><h3 className="font-serif text-xl text-slate-900">{title}</h3><p className="mb-5 mt-3 text-sm text-slate-600">{text}</p><Link to={to} className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-dark-red underline underline-offset-4">{link}<ArrowRight size={16} aria-hidden="true" /></Link></article>)}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between"><p className="text-slate-600">Questions about giving? We would love to hear from you.</p><a href={`mailto:${email}`} className="inline-flex items-center gap-2 break-all font-medium text-dark-red"><Mail size={16} className="shrink-0" aria-hidden="true" />{email}</a></div>
      </section>
    </div>
  );
}
