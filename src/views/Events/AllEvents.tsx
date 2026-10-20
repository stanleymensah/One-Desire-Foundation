"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  LayoutGrid,
  CalendarDays,
  MapPin,
} from "lucide-react";
import {
  type CalendarEvent,
  type Filter,
  FILTERS,
  DEFAULT_COLOR,
  WEEKDAYS,
  MAX_VISIBLE,
  sampleEvents,
} from "@/data/calendar";
import { keyOf, formatTime, buildMonthGrid } from "@/lib/calendar_utils";
import { EventDetailDialog } from "@/components/EventDetailDialog";
import { Badge } from "@/components/ui/badge";

type ViewMode = "calendar" | "card";

export default function AllEvents() {
  const now = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(
    () => new Date(now.getFullYear(), now.getMonth(), 1),
  );
  const [filter, setFilter] = useState<Filter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const events: CalendarEvent[] = useMemo(() => sampleEvents(), []);

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const monthDays = useMemo(
    () => buildMonthGrid(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const filteredEvents = useMemo(() => {
    return events
      .filter(({ start }) => {
        const date = new Date(start);
        if (filter === "past" && date >= now) return false;
        if (filter === "upcoming" && date < now) return false;
        return true;
      })
      .sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
      );
  }, [events, filter, now]);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, { event: CalendarEvent; date: Date }[]>();
    for (const event of filteredEvents) {
      const date = new Date(event.start);
      const k = keyOf(date);
      const list = map.get(k) ?? [];
      list.push({ event, date });
      map.set(k, list);
    }
    return map;
  }, [filteredEvents]);

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const goToMonth = (offset: number) =>
    setViewDate(new Date(viewYear, viewMonth + offset, 1));
  const goToToday = () =>
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));

  const title = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full flex flex-col items-center justify-center pt-24 px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto bg-white text-zinc-900 text-sm rounded-xs overflow-hidden shadow-2xl border border-zinc-200/60">
        {/* Header Controls */}
        <header className="flex flex-wrap items-center justify-between gap-4 p-4 md:p-7 border-b border-zinc-100">
          <div className="flex items-center gap-3.5">
            {viewMode === "calendar" && (
              <>
                <button
                  type="button"
                  onClick={() => goToMonth(-1)}
                  aria-label="Previous month"
                  className="text-[#5cb860] grid place-items-center w-7 h-7 rounded-xs hover:bg-zinc-100 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <h1 className="m-0 text-base font-semibold">{title}</h1>
                <button
                  type="button"
                  onClick={() => goToMonth(1)}
                  aria-label="Next month"
                  className="text-[#5cb860] grid place-items-center w-7 h-7 rounded-xs hover:bg-zinc-100 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
            {viewMode === "card" && (
              <h1 className="m-0 text-lg font-bold">All Events & Campaigns</h1>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              className="inline-flex p-1 gap-0.5 border border-zinc-200 rounded-xs"
              role="group"
            >
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={filter === f.id}
                  className={`h-9 px-4 rounded-xs font-medium transition-colors ${
                    filter === f.id
                      ? "bg-[#5cb860] text-white"
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {viewMode === "calendar" && (
              <button
                type="button"
                onClick={goToToday}
                className="inline-flex items-center gap-2 h-9 px-4 border border-zinc-200 rounded-xs font-medium hover:bg-zinc-50 transition-colors"
              >
                <CalendarIcon size={16} className="text-[#5cb860]" />
                Today
              </button>
            )}
            <div className="inline-flex p-1 gap-0.5 border border-zinc-200 rounded-xs bg-zinc-50">
              <button
                type="button"
                onClick={() => setViewMode("calendar")}
                className={`flex items-center gap-1.5 h-9 px-3.5 rounded-xs font-medium transition-colors ${
                  viewMode === "calendar"
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                <CalendarDays size={16} />
                <span className="hidden sm:inline">Calendar</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("card")}
                className={`flex items-center gap-1.5 h-9 px-3.5 rounded-xs font-medium transition-colors ${
                  viewMode === "card"
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                <LayoutGrid size={16} />
                <span className="hidden sm:inline">Cards</span>
              </button>
            </div>
          </div>
        </header>

        {viewMode === "calendar" ? (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-7 min-w-[760px]">
              {WEEKDAYS.map((w, idx) => (
                <div
                  key={w}
                  className={`py-3 px-3 text-right text-[11px] font-medium text-zinc-500 ${
                    idx !== 0 ? "border-l border-zinc-200" : ""
                  }`}
                >
                  {w}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 min-w-[760px]">
              {monthDays.map((d, index) => {
                const inMonth = d.getMonth() === viewMonth;
                const isToday = keyOf(d) === keyOf(now);
                const items = eventsByDay.get(keyOf(d)) ?? [];
                const visible = items.slice(0, MAX_VISIBLE);
                const hidden = items.length - visible.length;

                return (
                  <div
                    key={keyOf(d)}
                    className={`bg-zinc-50/50 border-t border-zinc-200 min-h-[130px] p-2.5 ${
                      index % 7 !== 0 ? "border-l border-zinc-200" : ""
                    }`}
                  >
                    <div className="flex justify-end mb-2">
                      <span
                        className={`min-w-[26px] h-6 px-1.5 grid place-items-center rounded-xs text-[15px] ${
                          !inMonth ? "text-zinc-400" : "text-zinc-700"
                        } ${
                          isToday ? "bg-[#5cb860] text-white font-semibold" : ""
                        }`}
                      >
                        {d.getDate()}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      {visible.map(({ event }) => (
                        <button
                          key={event.id}
                          type="button"
                          onClick={() => handleEventClick(event)}
                          className="flex items-center gap-1.5 w-full py-1 px-1.5 bg-white rounded-xs text-[11.5px] min-w-0 shadow-xs border border-zinc-100 hover:border-emerald-300 hover:shadow-sm text-left transition-all cursor-pointer"
                        >
                          <span
                            className="shrink-0 w-2 h-2 rounded-xs"
                            style={{
                              backgroundColor: event.color ?? DEFAULT_COLOR,
                            }}
                          />
                          <span className="shrink-0 text-zinc-400 text-[11px]">
                            {detailsTime(event)}
                          </span>
                          <span className="truncate text-zinc-800 font-medium">
                            {event.emoji} {event.title}
                          </span>
                        </button>
                      ))}
                      {hidden > 0 && (
                        <span className="pl-1 text-[11px] text-zinc-400 font-medium">
                          +{hidden} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-6 bg-zinc-50/50 min-h-[400px]">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-16 text-zinc-400">
                No events found for this filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => {
                  const details = event.activityDetails;
                  return (
                    <div
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      className="bg-white rounded-xs overflow-hidden border border-zinc-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col group"
                    >
                      {details?.image && (
                        <div className="relative w-full h-40 bg-zinc-100 overflow-hidden rounded-t-xs">
                          <img
                            src={
                              typeof details.image === "string"
                                ? details.image
                                : details.image.src
                            }
                            alt={details.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-xs"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge
                              variant="secondary"
                              className="bg-white/90 text-zinc-800 backdrop-blur-xs font-semibold rounded-xs"
                            >
                              {details.type}
                            </Badge>
                          </div>
                        </div>
                      )}

                      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                        <div className="space-y-2">
                          {!details?.image && (
                            <Badge
                              variant="secondary"
                              className="bg-emerald-50 text-emerald-700 border-emerald-200 rounded-xs"
                            >
                              {details?.type || "Event"}
                            </Badge>
                          )}
                          <h3 className="font-bold text-zinc-900 text-base group-hover:text-[#5cb860] transition-colors">
                            {event.emoji} {event.title}
                          </h3>
                        </div>

                        <div className="space-y-1.5 text-xs text-zinc-500 pt-2 border-t border-zinc-100">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-3.5 h-3.5 text-[#5cb860]" />
                            <span>{details?.details.date}</span>
                          </div>
                          {details?.details.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-[#5cb860]" />
                              <span className="truncate">
                                {details.details.location}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <EventDetailDialog
        event={selectedEvent}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}

function detailsTime(event: CalendarEvent) {
  if (event.activityDetails.details.time) {
    return event.activityDetails.details.time;
  }
  return formatTime(new Date(event.start));
}
