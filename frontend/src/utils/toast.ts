import { toast } from "react-hot-toast";

export function success(message: string) {
  toast.success(message);
}

export function error(message: string) {
  toast.error(message);
}

export function info(message: string) {
  toast(message);
}