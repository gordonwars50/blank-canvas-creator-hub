
"use client";

import * as React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils"

interface AvatarData {
  src?: string;
  alt: string;
  name: string;
  initials: string;
}

interface AvatarGroupWithTooltipsProps {
  avatars?: AvatarData[];
  maxAvatars?: number;
}

const DEFAULT_AVATARS = [
  {
    src: "https://randomuser.me/api/portraits/men/32.jpg",
    alt: "John Doe",
    name: "John Doe",
    initials: "JD",
  },
  {
    src: "https://randomuser.me/api/portraits/women/44.jpg",
    alt: "Sarah Smith",
    name: "Sarah Smith",
    initials: "SS",
  },
  {
    src: "https://randomuser.me/api/portraits/men/91.jpg",
    alt: "Alex Wong",
    name: "Alex Wong",
    initials: "AW",
  },
  {
    src: "https://randomuser.me/api/portraits/women/17.jpg",
    alt: "Emma Johnson",
    name: "Emma Johnson",
    initials: "EJ",
  },
];

export function AvatarGroupWithTooltips({ avatars = DEFAULT_AVATARS, maxAvatars = 4 }: AvatarGroupWithTooltipsProps) {
  const displayAvatars = avatars.slice(0, maxAvatars);
  const remainingCount = avatars.length - maxAvatars;

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center">
        <div className="flex items-center relative">
          {displayAvatars.map((avatar, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={cn("relative hover:z-10", index > 0 && "-ml-2")}
                >
                  <Avatar className="transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg border-2 border-gray-900 w-8 h-8">
                    <AvatarImage src={avatar.src} alt={avatar.alt} />
                    <AvatarFallback className="text-xs">{avatar.initials}</AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="font-medium">
                {avatar.name}
              </TooltipContent>
            </Tooltip>
          ))}
          {remainingCount > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative hover:z-10 -ml-2">
                  <Avatar className="transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg border-2 border-gray-900 w-8 h-8">
                    <AvatarFallback className="text-xs bg-gray-700 text-gray-300">
                      +{remainingCount}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="font-medium">
                {remainingCount} more team member{remainingCount !== 1 ? 's' : ''}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
