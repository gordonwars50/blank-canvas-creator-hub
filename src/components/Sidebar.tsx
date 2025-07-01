
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  TrendingUp, 
  Music, 
  Film, 
  Gamepad2, 
  Newspaper,
  Trophy,
  Lightbulb,
  Shirt,
  History,
  PlaySquare,
  Clock,
  ThumbsUp,
  Download
} from "lucide-react";

const Sidebar = () => {
  const mainNavItems = [
    { icon: Home, label: "Home", active: true },
    { icon: TrendingUp, label: "Trending" },
    { icon: Music, label: "Music" },
    { icon: Film, label: "Movies" },
    { icon: Gamepad2, label: "Gaming" },
    { icon: Newspaper, label: "News" },
    { icon: Trophy, label: "Sports" },
    { icon: Lightbulb, label: "Learning" },
    { icon: Shirt, label: "Fashion & Beauty" },
  ];

  const libraryItems = [
    { icon: History, label: "History" },
    { icon: PlaySquare, label: "Your videos" },
    { icon: Clock, label: "Watch later" },
    { icon: ThumbsUp, label: "Liked videos" },
    { icon: Download, label: "Downloads" },
  ];

  return (
    <aside className="hidden md:block w-64 h-screen sticky top-16 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4 space-y-1">
        {/* Main Navigation */}
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 h-10 ${
                item.active 
                  ? "bg-gray-100 text-gray-900 font-medium" 
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Library Section */}
        <div className="space-y-1">
          <h3 className="px-3 text-sm font-semibold text-gray-900 mb-2">
            Library
          </h3>
          {libraryItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start gap-3 h-10 text-gray-700 hover:bg-gray-50"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Footer */}
        <div className="px-3 text-xs text-gray-500 space-y-2">
          <p>About Press Copyright</p>
          <p>Contact us Creators</p>
          <p>Advertise Developers</p>
          <p className="pt-2">© 2024 Creatify</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
