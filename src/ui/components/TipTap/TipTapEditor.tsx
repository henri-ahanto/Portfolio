'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo } from 'lucide-react'

export const TiptapEditor = ({ value, onChange }: { value: string; onChange: (html: string) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert focus:outline-none max-w-full min-h-[150px] p-4 text-slate-300',
      },
    },
  })

  if (!editor) return null

  const MenuButton = ({ onClick, isActive, children }: any) => (
    <button
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className={`p-2 rounded-lg transition-all ${
        isActive ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="border border-white/5 rounded-2xl bg-slate-900/40 overflow-hidden focus-within:border-blue-500/30 transition-all">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-black/20 border-b border-white/5">
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
          <Bold size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
          <Italic size={16} />
        </MenuButton>
        <div className="w-px h-4 bg-white/10 mx-1 self-center" />
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
          <List size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}>
          <ListOrdered size={16} />
        </MenuButton>
        <div className="w-px h-4 bg-white/10 mx-1 self-center" />
        <MenuButton onClick={() => editor.chain().focus().undo().run()}>
          <Undo size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()}>
          <Redo size={16} />
        </MenuButton>
      </div>

      {/* Editor Surface */}
      <EditorContent editor={editor} />
    </div>
  )
}