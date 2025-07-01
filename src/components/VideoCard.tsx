
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface VideoCardProps {
  title: string;
  channel: string;
  views: string;
  uploadTime: string;
  duration: string;
  thumbnail: string;
  channelAvatar?: string;
  isLive?: boolean;
}

const VideoCard = ({
  title,
  channel,
  views,
  uploadTime,
  duration,
  thumbnail,
  channelAvatar,
  isLive = false,
}: VideoCardProps) => {
  return (
    <Card className="group cursor-pointer border-0 shadow-none hover:shadow-lg transition-all duration-300 animate-fade-in">
      {/* Thumbnail */}
      <div className="relative mb-3 overflow-hidden rounded-xl">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2">
          {isLive ? (
            <Badge className="bg-youtube-red text-white px-2 py-1 text-xs font-medium">
              LIVE
            </Badge>
          ) : (
            <Badge className="bg-black/70 text-white px-2 py-1 text-xs">
              {duration}
            </Badge>
          )}
        </div>
      </div>

      {/* Video Info */}
      <div className="flex gap-3">
        <Avatar className="h-9 w-9 mt-1">
          <AvatarImage src={channelAvatar || "/placeholder.svg?height=36&width=36"} />
          <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">
            {channel.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-5 mb-1 group-hover:text-youtube-red transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-1 hover:text-gray-900 transition-colors">
            {channel}
          </p>
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <span>{views} views</span>
            <span>•</span>
            <span>{uploadTime}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoCard;
