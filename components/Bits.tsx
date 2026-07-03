import Image from "next/image";
import { cn } from "@/lib/utils";

/** Signature divider: blue rink lines flanking a red center dot. */
export function RinkLine({ className }: { className?: string }) {
  return (
    <div className={cn("rink-line", className)} role="separator" aria-hidden>
      <span className="rink-line__dot" />
    </div>
  );
}

type PhotoSlotProps = {
  /** Real photo URL (club or free stock). Leave empty to show a branded slot. */
  src?: string;
  alt?: string;
  className?: string;
  /** Caption shown on the placeholder to mark where a real photo goes. */
  label?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * A photo slot. When `src` is set it renders an optimized image; otherwise it
 * renders an on-brand placeholder (faceoff-circle motif) so the layout looks
 * finished before real photography is supplied.
 */
export function PhotoSlot({
  src,
  alt = "",
  className,
  label = "Clubfoto",
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: PhotoSlotProps) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden bg-navy-800 text-white/70",
        className
      )}
      aria-hidden
    >
      <FaceoffMotif className="absolute inset-0 h-full w-full text-white/[0.07]" />
      <div className="relative z-10 flex flex-col items-center gap-2">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-white/45">
          <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M3 8.5v7l9 4.5 9-4.5v-7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
        <span className="label-mono text-white/50">{label}</span>
      </div>
    </div>
  );
}

/** Faint faceoff-circle geometry used as texture in placeholders. */
export function FaceoffMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="200" cy="150" r="70" />
        <circle cx="200" cy="150" r="4" fill="currentColor" stroke="none" />
        <line x1="120" y1="150" x2="280" y2="150" />
        <path d="M150 90 h100 M150 210 h100" />
      </g>
    </svg>
  );
}
