'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlock from '@tiptap/extension-code-block';
import { 
  Bold, Italic, Strikethrough, Heading2, Heading3, List, ListOrdered, 
  Quote, Code, Minus, WrapText, Undo, Redo, Code2
} from 'lucide-react';

const EditorToolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const menuItems = [
    { name: 'Bold', icon: Bold, action: () => editor.chain().focus().toggleBold().run(), isActive: () => editor.isActive('bold') },
    { name: 'Italic', icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), isActive: () => editor.isActive('italic') },
    { name: 'Strike', icon: Strikethrough, action: () => editor.chain().focus().toggleStrike().run(), isActive: () => editor.isActive('strike') },
    { name: 'Heading 2', icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: () => editor.isActive('heading', { level: 2 }) },
    { name: 'Heading 3', icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: () => editor.isActive('heading', { level: 3 }) },
    { name: 'Bullet List', icon: List, action: () => editor.chain().focus().toggleBulletList().run(), isActive: () => editor.isActive('bulletList') },
    { name: 'Ordered List', icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), isActive: () => editor.isActive('orderedList') },
    { name: 'Blockquote', icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), isActive: () => editor.isActive('blockquote') },
    { name: 'Inline Code', icon: Code, action: () => editor.chain().focus().toggleCode().run(), isActive: () => editor.isActive('code') },
    { name: 'Code Block', icon: Code2, action: () => editor.chain().focus().toggleCodeBlock().run(), isActive: () => editor.isActive('codeBlock') },
    { name: 'Horizontal Rule', icon: Minus, action: () => editor.chain().focus().setHorizontalRule().run(), isActive: () => false },
    { name: 'Hard Break', icon: WrapText, action: () => editor.chain().focus().setHardBreak().run(), isActive: () => false },
    { name: 'Undo', icon: Undo, action: () => editor.chain().focus().undo().run(), isActive: () => false },
    { name: 'Redo', icon: Redo, action: () => editor.chain().focus().redo().run(), isActive: () => false },
  ];

  return (
    <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center gap-1 flex-wrap">
      {menuItems.map(item => (
        <button
          type="button"
          key={item.name}
          onClick={item.action}
          className={`p-2 rounded-md hover:bg-gray-700 ${item.isActive() ? 'bg-gray-700 text-blue-400' : 'text-gray-400'}`}
          title={item.name}
        >
          <item.icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
};

const TiptapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: false,
      }),
      CodeBlock,
      Placeholder.configure({
        placeholder: 'Start writing your amazing story...',
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none p-4 tiptap',
      },
    },
  });

  return (
    <div className="rounded-md border border-gray-700 bg-gray-900 text-gray-300 min-h-[400px] flex flex-col">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="flex-grow overflow-y-auto" />
    </div>
  );
};

export default TiptapEditor; 