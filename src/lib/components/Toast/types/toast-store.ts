import { type Writable } from "svelte/store";

export interface ToastStoreProps {}

export interface CustomToastStore extends Writable<ToastStoreProps> {
  add: () => void;
  remove: () => void;
}
