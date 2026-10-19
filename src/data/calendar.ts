import { events as rawEvents } from "@/data/events";

export type FoundationActivity = {
  name: string;
  type: "Event" | "Campaign" | "Collaboration";
  link: string | null;
  image: any;
  details: {
    date: string;
    time: string | null;
    location: string | null;
  };
};

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  color?: string;
  emoji?: string;
  activityDetails: FoundationActivity;
}

export type Filter = "all" | "past" | "upcoming";

export const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "past", label: "Past" },
  { id: "upcoming", label: "Upcoming" },
];

export const DEFAULT_COLOR = "#5cb860";
export const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const MAX_VISIBLE = 3;

export function sampleEvents(): CalendarEvent[] {
  const colors = {
    Event: "#3b82d6",
    Campaign: "#f4a73b",
    Collaboration: "#8a1fc7",
  };

  const emojis = {
    Event: "📅",
    Campaign: "📣",
    Collaboration: "🤝",
  };

  return rawEvents.map((activity, index) => {
    const parsedDate = new Date(activity.details.date);
    const isValidDate = !isNaN(parsedDate.getTime());
    const startDate = isValidDate ? parsedDate : new Date();

    return {
      id: String(index + 1),
      title: activity.name,
      start: startDate.toISOString(),
      color: colors[activity.type] || DEFAULT_COLOR,
      emoji: emojis[activity.type] || "📌",
      activityDetails: activity,
    };
  });
}