
import VideoCard from "./VideoCard";

const VideoGrid = () => {
  // Mock video data
  const videos = [
    {
      title: "Building Modern Web Applications with React and TypeScript",
      channel: "TechTutorials Pro",
      views: "1.2M",
      uploadTime: "2 days ago",
      duration: "15:42",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop&crop=center",
      channelAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    {
      title: "The Future of AI in Creative Industries - Live Discussion",
      channel: "AI Creative Hub",
      views: "45K",
      uploadTime: "1 hour ago",
      duration: "LIVE",
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=225&fit=crop&crop=center",
      isLive: true,
      channelAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=40&h=40&fit=crop&crop=face",
    },
    {
      title: "10 MacBook Pro Tips Every Developer Should Know",
      channel: "Dev Productivity",
      views: "890K",
      uploadTime: "1 week ago",
      duration: "12:15",
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=225&fit=crop&crop=center",
      channelAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    {
      title: "Remote Work Setup Tour - My Home Office 2024",
      channel: "Workspace Inspiration",
      views: "567K",
      uploadTime: "3 days ago",
      duration: "8:30",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=225&fit=crop&crop=center",
      channelAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    {
      title: "Coding on the Go - Best Laptop Setup for Developers",
      channel: "Mobile Dev Life",
      views: "234K",
      uploadTime: "5 days ago",
      duration: "18:45",
      thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=225&fit=crop&crop=center",
      channelAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    },
    {
      title: "Full Stack Development Roadmap 2024 - Complete Guide",
      channel: "Code Academy Plus",
      views: "1.8M",
      uploadTime: "1 month ago",
      duration: "25:12",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop&crop=center",
      channelAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
  ];

  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            title={video.title}
            channel={video.channel}
            views={video.views}
            uploadTime={video.uploadTime}
            duration={video.duration}
            thumbnail={video.thumbnail}
            channelAvatar={video.channelAvatar}
            isLive={video.isLive}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
