
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Upload, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-youtube-red to-youtube-red-light p-2 rounded-lg">
              <div className="text-white font-bold text-xl">C</div>
            </div>
            <span className="text-xl font-bold text-gray-900">Creatify</span>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex-1 max-w-2xl mx-8 hidden md:block">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search videos..."
              className="w-full pl-4 pr-12 py-2 border-gray-300 rounded-full focus:border-youtube-red focus:ring-youtube-red"
            />
            <Button
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full"
              variant="ghost"
            >
              <Search className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-3">
          <Button className="bg-youtube-red hover:bg-youtube-red-dark text-white rounded-full px-4 py-2 font-medium transition-colors">
            <Upload className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Create</span>
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-youtube-red text-white">U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
