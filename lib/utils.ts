import clsx, { type ClassValue } from "clsx";

/** Small className joiner. Kept dependency-light on purpose. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
