
import { useCallback, useState, useEffect } from 'react';
import { GlowTextareaRef } from '@/components/ui/glow-textarea';

export const useTextFormatting = (textareaRef: React.RefObject<GlowTextareaRef>, value: string) => {
  const [isBoldActive, setIsBoldActive] = useState(false);
  const [isHighlightActive, setIsHighlightActive] = useState(false);

  // Check if cursor is within formatted text
  const checkFormattingAtCursor = useCallback(() => {
    if (!textareaRef.current) return;
    
    const selection = textareaRef.current.getSelection();
    const text = value;
    const cursorPos = selection.start;
    
    // Check for bold formatting
    const beforeCursor = text.substring(0, cursorPos);
    const afterCursor = text.substring(cursorPos);
    
    // Check if cursor is between ** markers
    const lastBoldStart = beforeCursor.lastIndexOf('**');
    const nextBoldEnd = afterCursor.indexOf('**');
    const prevBoldEnd = beforeCursor.lastIndexOf('**', lastBoldStart - 1);
    
    const isInBold = lastBoldStart > prevBoldEnd && nextBoldEnd !== -1;
    setIsBoldActive(isInBold);
    
    // Check for highlight formatting
    const lastHighlightStart = beforeCursor.lastIndexOf('==');
    const nextHighlightEnd = afterCursor.indexOf('==');
    const prevHighlightEnd = beforeCursor.lastIndexOf('==', lastHighlightStart - 1);
    
    const isInHighlight = lastHighlightStart > prevHighlightEnd && nextHighlightEnd !== -1;
    setIsHighlightActive(isInHighlight);
  }, [textareaRef, value]);

  const toggleBold = useCallback(() => {
    if (!textareaRef.current) return;
    
    const selection = textareaRef.current.getSelection();
    const selectedText = selection.text;
    
    if (selectedText) {
      // Check if selected text is already bold
      if (selectedText.startsWith('**') && selectedText.endsWith('**')) {
        // Remove bold formatting
        const unformattedText = selectedText.slice(2, -2);
        textareaRef.current.replaceSelection(unformattedText);
      } else {
        // Add bold formatting
        const formattedText = `**${selectedText}**`;
        textareaRef.current.replaceSelection(formattedText);
      }
    } else if (isBoldActive) {
      // Remove formatting at cursor position
      const fullText = value;
      const cursorPos = selection.start;
      const beforeCursor = fullText.substring(0, cursorPos);
      const afterCursor = fullText.substring(cursorPos);
      
      const lastBoldStart = beforeCursor.lastIndexOf('**');
      const nextBoldEnd = afterCursor.indexOf('**');
      
      if (lastBoldStart !== -1 && nextBoldEnd !== -1) {
        const beforeBold = fullText.substring(0, lastBoldStart);
        const boldContent = fullText.substring(lastBoldStart + 2, cursorPos + nextBoldEnd);
        const afterBold = fullText.substring(cursorPos + nextBoldEnd + 2);
        
        const newText = beforeBold + boldContent + afterBold;
        const event = {
          target: { value: newText }
        } as React.ChangeEvent<HTMLTextAreaElement>;
        
        // This would need to be passed from parent component
        // For now, we'll just focus the textarea
        textareaRef.current.focus();
      }
    }
  }, [textareaRef, isBoldActive, value]);

  const toggleHighlight = useCallback(() => {
    if (!textareaRef.current) return;
    
    const selection = textareaRef.current.getSelection();
    const selectedText = selection.text;
    
    if (selectedText) {
      // Check if selected text is already highlighted
      if (selectedText.startsWith('==') && selectedText.endsWith('==')) {
        // Remove highlight formatting
        const unformattedText = selectedText.slice(2, -2);
        textareaRef.current.replaceSelection(unformattedText);
      } else {
        // Add highlight formatting
        const formattedText = `==${selectedText}==`;
        textareaRef.current.replaceSelection(formattedText);
      }
    }
  }, [textareaRef]);

  // Listen for selection changes
  useEffect(() => {
    const handleSelectionChange = () => {
      setTimeout(checkFormattingAtCursor, 0);
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, [checkFormattingAtCursor]);

  return {
    isBoldActive,
    isHighlightActive,
    toggleBold,
    toggleHighlight,
    checkFormattingAtCursor
  };
};
