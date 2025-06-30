import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough, Highlighter, Link as LinkIcon, Type } from 'lucide-react';
interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  className?: string;
}
export interface TiptapEditorRef {
  focus: () => void;
  getHTML: () => string;
  getText: () => string;
}
const glowColorMap = {
  blue: {
    base: 220,
    spread: 200
  },
  purple: {
    base: 280,
    spread: 300
  },
  green: {
    base: 120,
    spread: 200
  },
  red: {
    base: 0,
    spread: 200
  },
  orange: {
    base: 30,
    spread: 200
  }
};
const TiptapEditor = forwardRef<TiptapEditorRef, TiptapEditorProps>(({
  content,
  onChange,
  placeholder = 'Start typing...',
  glowColor = 'purple',
  className = ''
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editor = useEditor({
    extensions: [StarterKit, Highlight.configure({
      multicolor: false,
      HTMLAttributes: {
        class: 'bg-yellow-500 text-black px-1 rounded'
      }
    }), Underline, Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-blue-400 underline cursor-pointer'
      }
    })],
    content,
    onUpdate: ({
      editor
    }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none text-white placeholder-gray-400 p-4 min-h-[300px]',
        'data-placeholder': placeholder
      }
    }
  });
  useImperativeHandle(ref, () => ({
    focus: () => editor?.commands.focus(),
    getHTML: () => editor?.getHTML() || '',
    getText: () => editor?.getText() || ''
  }));
  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const {
        clientX: x,
        clientY: y
      } = e;
      if (containerRef.current) {
        containerRef.current.style.setProperty('--x', x.toFixed(2));
        containerRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        containerRef.current.style.setProperty('--y', y.toFixed(2));
        containerRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };
    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);
  const {
    base,
    spread
  } = glowColorMap[glowColor];
  const getInlineStyles = (): React.CSSProperties & Record<string, any> => {
    return {
      '--base': base,
      '--spread': spread,
      '--radius': '8',
      '--border': '1',
      '--backdrop': 'hsl(0 0% 60% / 0.12)',
      '--backup-border': 'var(--backdrop)',
      '--size': '200',
      '--outer': '1',
      '--border-size': 'calc(var(--border, 2) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      '--saturation': '50',
      '--lightness': '50',
      '--bg-spot-opacity': '0.05',
      '--border-spot-opacity': '0.3',
      '--border-light-opacity': '0.1',
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,
      backgroundColor: 'var(--backdrop, transparent)',
      backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
      backgroundPosition: '50% 50%',
      backgroundAttachment: 'fixed',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative',
      touchAction: 'none',
      borderRadius: 'calc(var(--radius) * 1px)',
      overflow: 'hidden'
    };
  };
  const beforeAfterStyles = `
    [data-glow-editor]::before,
    [data-glow-editor]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    
    [data-glow-editor]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(2);
    }
    
    [data-glow-editor]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
      );
    }

    .ProseMirror p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      float: left;
      color: #6b7280;
      pointer-events: none;
      height: 0;
    }
  `;
  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleItalic = () => editor?.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor?.chain().focus().toggleUnderline().run();
  const toggleStrike = () => editor?.chain().focus().toggleStrike().run();
  const toggleHighlight = () => editor?.chain().focus().toggleHighlight().run();
  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) {
      return;
    }
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange('link').setLink({
      href: url
    }).run();
  };
  const clearFormatting = () => editor?.chain().focus().unsetAllMarks().run();
  if (!editor) {
    return null;
  }
  return <>
      <style dangerouslySetInnerHTML={{
      __html: beforeAfterStyles
    }} />
      <div className="space-y-3">
        {/* Toolbar */}
        <div className="flex items-center space-x-2 flex-wrap">
          <button onClick={toggleBold} className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${editor.isActive('bold') ? 'bg-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`} title="Bold (Ctrl+B)">
            <Bold className="w-3 h-3" />
            <span>Bold</span>
          </button>

          <button onClick={toggleItalic} className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${editor.isActive('italic') ? 'bg-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`} title="Italic (Ctrl+I)">
            <Italic className="w-3 h-3" />
            <span>Italic</span>
          </button>

          <button onClick={toggleUnderline} className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${editor.isActive('underline') ? 'bg-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`} title="Underline (Ctrl+U)">
            <UnderlineIcon className="w-3 h-3" />
            <span>Underline</span>
          </button>

          <button onClick={toggleStrike} className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${editor.isActive('strike') ? 'bg-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`} title="Strikethrough (Ctrl+Shift+S)">
            <Strikethrough className="w-3 h-3" />
            <span>Strike</span>
          </button>

          <button onClick={toggleHighlight} className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${editor.isActive('highlight') ? 'bg-yellow-600 text-white' : 'bg-red-900/30 hover:bg-red-900/50 text-white'}`} title="Highlight (Ctrl+H)">
            <Highlighter className="w-3 h-3" />
            <span>Highlight</span>
          </button>

          <button onClick={setLink} className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${editor.isActive('link') ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`} title="Link (Ctrl+K)">
            <LinkIcon className="w-3 h-3" />
            <span>Link</span>
          </button>

          <button onClick={clearFormatting} className="flex items-center space-x-1 px-3 py-1 rounded text-sm bg-gray-700 hover:bg-gray-600 text-white transition-colors" title="Clear Formatting">
            <Type className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>

        {/* Editor */}
        <div ref={containerRef} data-glow-editor style={getInlineStyles()} className={`relative w-full ${className}`}>
          <EditorContent editor={editor} />
        </div>

        {/* Keyboard shortcuts info */}
        <div className="text-xs text-gray-500">
          <p>Shortcuts: Ctrl+B (bold), Ctrl+I (italic), Ctrl+U (underline), Ctrl+Shift+S (strike), Ctrl+H (highlight), Ctrl+K (link), Ctrl+Z (Undo), Ctrl + Shift +Z (Redo)</p>
        </div>
      </div>
    </>;
});
TiptapEditor.displayName = 'TiptapEditor';
export { TiptapEditor };