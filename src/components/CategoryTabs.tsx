
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const CategoryTabs = () => {
  const categories = [
    "All",
    "Music",
    "Gaming",
    "Movies",
    "News",
    "Sports",
    "Technology",
    "Cooking",
    "Travel",
    "Fashion",
    "Education",
    "Comedy",
    "Entertainment",
    "Science",
    "Fitness"
  ];

  return (
    <div className="border-b border-gray-200 bg-white sticky top-16 z-40">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-3 px-6 py-3">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={index === 0 ? "default" : "secondary"}
              className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ${
                index === 0
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
};

export default CategoryTabs;
