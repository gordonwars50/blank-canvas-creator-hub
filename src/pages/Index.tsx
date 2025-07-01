
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CategoryTabs from "@/components/CategoryTabs";
import VideoGrid from "@/components/VideoGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryTabs />
      <div className="flex">
        <Sidebar />
        <VideoGrid />
      </div>
    </div>
  );
};

export default Index;
