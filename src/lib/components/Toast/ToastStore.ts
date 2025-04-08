import { writable, type Writable } from "svelte/store";
import { CustomToastStore } from "./types";

export function createToastStore(): CustomToastStore {
  const { subscribe, set, update } = writable<any[]>([]);

  return {
    subscribe,
    add: (toast: any) => update((toasts: any[]) => [...toasts, toast]),
    remove: (id: number) =>
      update((toasts) => toasts.filter((toast) => toast.id !== id)),
  };
}
