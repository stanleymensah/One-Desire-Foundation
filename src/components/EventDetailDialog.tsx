"use client";

import { type CalendarEvent } from "@/data/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface EventDetailDialogProps {
  event: CalendarEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDetailDialog({
  event,
  open,
  onOpenChange,
}: EventDetailDialogProps) {
  if (!event) return null;

  const details = event.activityDetails;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl bg-white rounded-xs">
        {details?.image && (
          <div className="relative w-full h-48 bg-zinc-100 rounded-t-xs overflow-hidden">
            <img
              src={typeof details.image === "string" ? details.image : details.image.src}
              alt={details.name}
              className="w-full h-full object-cover rounded-xs"
            />
          </div>
        )}

        <div className="p-6 space-y-4">
          <DialogHeader className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-emerald-50 text-emerald-700 border-emerald-200 rounded-xs"
              >
                {details?.type || "Event"}
              </Badge>
            </div>
            <DialogTitle className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              <span>{event.emoji}</span>
              <span>{details?.name}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2.5 pt-2 text-sm text-zinc-600 border-t border-zinc-100">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{details?.details.date}</span>
            </div>

            {details?.details.time && (
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{details.details.time}</span>
              </div>
            )}

            {details?.details.location && (
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{details.details.location}</span>
              </div>
            )}
          </div>

          {details?.link && (
            <div className="pt-4 border-t border-zinc-100">
                <Link to={details.link} target="_blank" rel="noopener noreferrer">
              <Button  className="w-full flex items-center justify-center">
                  View Post / Learn More <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
                </Link>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}