import { writable } from "svelte/store"

export interface Toast {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message?: string
  duration?: number
  dismissible?: boolean
}

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([])

  return {
    subscribe,
    add: (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substr(2, 9)
      const newToast: Toast = {
        id,
        duration: 6000,
        dismissible: true,
        ...toast,
      }

      update((toasts) => [...toasts, newToast])

      // Auto-remove toast after duration
      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          toastStore.remove(id)
        }, newToast.duration)
      }

      return id
    },
    remove: (id: string) => {
      update(t => t.filter(t => t.id !== id))
    },
    clear: () => {
      update(() => [])
    },
    success: (title: string, message?: string, duration?: number) => {
      return toastStore.add({ type: "success", title, message, duration })
    },
    error: (title: string, message?: string, duration?: number) => {
      return toastStore.add({ type: "error", title, message, duration })
    },
    warning: (title: string, message?: string, duration?: number) => {
      return toastStore.add({ type: "warning", title, message, duration })
    },
    info: (title: string, message?: string, duration?: number) => {
      return toastStore.add({ type: "info", title, message, duration })
    },
  }
}

export const toastStore = createToastStore()
