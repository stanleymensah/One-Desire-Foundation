import { events } from "@/data/events";
import { motion } from "framer-motion";
import heroImage from "@/assets/event.png";
import Y4K from "@/assets/Y4K.jpg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
            <div className="mb-8 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-foreground/60">
                Past events
              </p>
            </div>

            <div className="events flex w-full flex-wrap justify-center gap-4 px-4 sm:px-6">
              {events.map((event) => {
                const titleId = `event-${event.name}-${event.details.date}`;

                return (
                  <Dialog key={`${event.name}-${event.details.date}`}>
                    <DialogTrigger
                      render={
                        <button
                          type="button"
                          aria-label={`View details for ${event.name}`}
                          className="flex w-full max-w-xl shrink-0 overflow-hidden rounded-xs border border-border bg-white p-0 text-left shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
                        />
                      }
                    >
                      <img
                        src={event.image ?? Y4K}
                        alt=""
                        className="h-45 w-36 shrink-0 object-cover"
                      />
                      <span className="flex min-w-0 flex-col justify-center gap-2 p-4">
                        <span className="text-base font-semibold leading-tight text-dark-red">
                          {event.name}
                        </span>
                        <span className="text-sm text-foreground/70">
                          {event.details.date}
                        </span>
                      </span>
                    </DialogTrigger>

                    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                      <img
                        src={event.image ?? Y4K}
                        alt=""
                        className="aspect-video w-full rounded-xs object-cover"
                      />
                      <DialogHeader>
                        <DialogTitle id={titleId} className="text-xl">
                          {event.name}
                        </DialogTitle>
                        <DialogDescription>{event.type}</DialogDescription>
                      </DialogHeader>

                      <dl className="grid grid-cols-[5rem_1fr] gap-x-3 gap-y-2 text-sm">
                        <dt className="font-medium text-foreground/60">Date</dt>
                        <dd>{event.details.date}</dd>
                        <dt className="font-medium text-foreground/60">Time</dt>
                        <dd>
                          {event.details.time ?? "Not specified in profile"}
                        </dd>
                        <dt className="font-medium text-foreground/60">
                          Location
                        </dt>
                        <dd>
                          {event.details.location ??
                            "Not specified in profile"}
                        </dd>
                      </dl>

                      {event.link && (
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex w-fit items-center rounded-xs bg-dark-red px-4 py-2 font-medium text-white hover:bg-primary-red"
                        >
                          Go to Post
                        </a>
                      )}
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
