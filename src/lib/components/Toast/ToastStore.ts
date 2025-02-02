import { writable, type Writable } from 'svelte/store';

export function createToastStore(): Writable<any[]> {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    add: (toast: any) => update((toasts: any[]) => [...toasts, toast]),
    remove: (id: number) => update((toasts) => toasts.filter((toast) => toast.id !== id)),
  };
}