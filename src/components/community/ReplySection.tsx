
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';
import { YouTubeComment } from '@/types/comments';
import { motion, AnimatePresence } from 'framer-motion';

interface ReplySectionProps {
  comment: YouTubeComment;
  isReplying: boolean;
  replyText: string;
  onReplyTextChange: (text: string) => void;
  onSubmitReply: (commentId: string, replyText: string) => void;
  onCancelReply: () => void;
}

const ReplySection: React.FC<ReplySectionProps> = ({
  comment,
  isReplying,
  replyText,
  onReplyTextChange,
  onSubmitReply,
  onCancelReply
}) => {
  const [showReplies, setShowReplies] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim()) {
      onSubmitReply(comment.id, replyText);
    }
  };

  return (
    <div className="mt-4">
      {/* Show Replies Toggle */}
      {comment.replies && comment.replies.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowReplies(!showReplies)}
          className="text-blue-400 hover:text-blue-300 mb-3 p-0 h-auto"
        >
          {showReplies ? (
            <ChevronUp className="w-4 h-4 mr-1" />
          ) : (
            <ChevronDown className="w-4 h-4 mr-1" />
          )}
          {showReplies ? 'Hide' : 'Show'} {comment.replyCount} replies
        </Button>
      )}

      {/* Replies List */}
      <AnimatePresence>
        {showReplies && comment.replies && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden ml-6 space-y-4 mb-4"
          >
            {comment.replies.map(reply => (
              <div key={reply.id} className="flex space-x-3">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={reply.authorProfileImageUrl} alt={reply.authorDisplayName} />
                  <AvatarFallback>{reply.authorDisplayName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-white text-sm">{reply.authorDisplayName}</h4>
                      {reply.isOwnComment && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          Your reply
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm">{reply.textDisplay}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{new Date(reply.publishedAt).toLocaleDateString()}</span>
                      <span>{reply.likeCount} likes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reply Input */}
      <AnimatePresence>
        {isReplying && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="overflow-hidden ml-6 mt-3"
          >
            <div className="flex space-x-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="You" />
                <AvatarFallback>JC</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <textarea
                  value={replyText}
                  onChange={(e) => onReplyTextChange(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows={3}
                  autoFocus
                />
                <div className="flex items-center justify-end space-x-2 mt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onCancelReply}
                    className="text-gray-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!replyText.trim()}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReplySection;
