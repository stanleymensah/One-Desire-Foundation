import { events } from "@/data/events";
import { motion } from "framer-motion";
import heroImage from "@/assets/event.png";
import Y4K from "@/assets/Y4K.jpg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  MapPin,
  XIcon,
} from "lucide-react";

const previewEvents = events.slice(0, 4);

export default function Events() {
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="contain flex flex-col gap-8 w-full">
          {/* Hero Section  */}

          <section className="relative w-full overflow-hidden bg-transparent">
            <img
              src={heroImage}
              alt="hero"
              className="block h-[calc(100vh-80px)] w-full object-cover object-center bg-transparent"
            />

            <div className="details absolute inset-0 z-20 flex items-center px-6 sm:px-10 lg:px-24">
              <motion.div
                className="text flex max-w-xl flex-col gap-4"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h2
                  className="font-medium"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                >
                  Events & Campaigns
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  Discover our past & upcoming events, awareness campaigns, and
                  community gatherings.
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Evetns Section */}

          <section className="w-full flex flex-col gap-4">
            <SectionTitle label="some of our Past events" />

            <div className="events flex w-full flex-wrap items-center justify-center gap-8 px-4 py-4 sm:px-6">
              {previewEvents.map((event) => {
                const titleId = `event-${event.name}-${event.details.date}`;
                const poster = event.image ?? Y4K;

                return (
                  <Dialog key={`${event.name}-${event.details.date}`}>
                    <DialogTrigger
                      render={
                        <button
                          type="button"
                          aria-label={`View details for ${event.name}`}
                          className="group relative aspect-[3/5] cursor-pointer  w-full max-w-[300px] overflow-hidden rounded-md bg-black p-0 text-left shadow-[0_16px_32px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/15 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_40px_-12px_rgba(0,0,0,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
                        />
                      }
                    >
                      <img
                        src={poster}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-focus:scale-105"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 group-focus:opacity-100"
                      />
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 flex-col gap-1 p-4 text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
                        <span className="text-base font-semibold leading-snug">
                          {event.name}
                        </span>
                        <span className="text-sm text-white/80">
                          {event.details.date}
                        </span>
                      </span>
                    </DialogTrigger>

                    <DialogContent
                      showCloseButton={false}
                      className="max-h-[90vh] gap-0 overflow-hidden p-0 sm:max-w-lg"
                    >
                      <div className="relative">
                        <img
                          src={poster}
                          alt=""
                          className="h-56 w-full object-cover sm:h-64"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
                        <span className="absolute bottom-4 left-5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium tracking-wide text-dark-red uppercase">
                          {event.type}
                        </span>
                        <DialogClose
                          render={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="absolute top-3 right-3 z-10 bg-white/90 text-foreground hover:bg-white"
                            />
                          }
                        >
                          <XIcon />
                          <span className="sr-only">Close</span>
                        </DialogClose>
                      </div>

                      <div className="flex flex-col gap-5 p-5 sm:p-6">
                        <DialogHeader className="gap-2">
                          <DialogTitle
                            id={titleId}
                            className="text-xl leading-snug text-dark-red"
                          >
                            {event.name}
                          </DialogTitle>
                          <DialogDescription className="text-sm">
                            {event.details.location
                              ? `${event.type} · ${event.details.location}`
                              : event.type}
                          </DialogDescription>
                        </DialogHeader>

                        <ul className="overflow-hidden rounded-md border border-border">
                          <li className="flex items-start gap-3 px-4 py-3">
                            <Calendar className="mt-0.5 size-4 shrink-0 text-primary-red" />
                            <div className="min-w-0">
                              <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                                Date
                              </p>
                              <p className="text-sm font-medium">
                                {event.details.date}
                              </p>
                            </div>
                          </li>
                          {event.details.time && (
                            <li className="flex items-start gap-3 border-t border-border px-4 py-3">
                              <Clock className="mt-0.5 size-4 shrink-0 text-primary-red" />
                              <div className="min-w-0">
                                <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                                  Time
                                </p>
                                <p className="text-sm font-medium">
                                  {event.details.time}
                                </p>
                              </div>
                            </li>
                          )}
                          {event.details.location && (
                            <li className="flex items-start gap-3 border-t border-border px-4 py-3">
                              <MapPin className="mt-0.5 size-4 shrink-0 text-primary-red" />
                              <div className="min-w-0">
                                <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                                  Location
                                </p>
                                <p className="text-sm font-medium">
                                  {event.details.location}
                                </p>
                              </div>
                            </li>
                          )}
                        </ul>

                        {event.link && (
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="w-fit">
                              View post
                              <ArrowUpRight />
                            </Button>
                          </a>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>

            <div className="flex w-full justify-center px-4 sm:px-6">
              <Link to="/events/all">
                <Button
                  variant="ghost"
                  size="lg"                  className="flex items-center gap-1 text-primary-red hover:text-dark-red"
                >
                  See All Events
                  <ArrowUpRight />
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
