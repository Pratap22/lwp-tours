'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

const TiptapRenderer = ({ content }) => {
  const editor = useEditor({
    editable: false,
    content: content,
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: true,
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-lg lg:prose-xl focus:outline-none max-w-full mx-auto',
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default TiptapRenderer;
