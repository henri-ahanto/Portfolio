import { useState } from 'react'

export const useDrawer = () => {
  const [open, setOpen] = useState(false)
  return {
    open,
    openDrawer: () => setOpen(true),
    closeDrawer: () => setOpen(false),
    toggle: () => setOpen(o => !o),
  }
}
