'use client'

import { X } from 'lucide-react'
import { ReactNode } from 'react'

export const Drawer = ({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open ? 'translate-x-0' : '-translate-x-full'
      } bg-black/50`}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-black w-72 h-full p-6"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="mb-4">
          <X />
        </button>
        {children}
      </div>
    </div>
  )
}
