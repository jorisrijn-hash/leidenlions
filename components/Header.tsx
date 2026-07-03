"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { nav, site, type NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

function hasChildren(item: NavItem): item is Extract<NavItem, { children: object }> {
  return "children" in item && Array.isArray((item as { children?: unknown }).children);
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 w-full bg-navy-900 text-white transition-shadow duration-200 ease-out",
        scrolled && "shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
      )}
      style={{ zIndex: "var(--z-sticky)" }}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <Image
            src="/logo.png"
            alt=""
            width={31}
            height={44}
            priority
            className="h-11 w-auto"
          />
          <span className="font-display text-[1.05rem] font-extrabold leading-none tracking-tight">
            LEIDEN<span className="text-red"> LIONS</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Hoofdmenu">
          {nav.map((item) =>
            hasChildren(item) ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-3 py-2 text-[0.95rem] font-semibold text-white/85 transition-colors duration-150 ease-out hover:text-white",
                    isActive(item.href) && "text-white"
                  )}
                  aria-haspopup="true"
                >
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className="mt-0.5 opacity-70">
                    <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                {/* Dropdown: absolute inside a non-clipping parent, scales from top. */}
                <div
                  className="invisible absolute left-0 top-full pt-2 opacity-0 translate-y-1 transition-[opacity,transform] duration-200 ease-out group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0"
                  style={{ zIndex: "var(--z-dropdown)" }}
                >
                  <div className="min-w-[240px] origin-top rounded-xl border border-white/10 bg-navy-800 p-1.5 shadow-2xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-[0.92rem] font-medium text-white/80 transition-colors duration-150 ease-out hover:bg-white/10 hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-[0.95rem] font-semibold text-white/85 transition-colors duration-150 ease-out hover:text-white",
                  isActive(item.href) && "text-white"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1 text-xs font-semibold sm:flex" aria-label="Taal">
            <span className="rounded px-1.5 py-0.5 text-white">NL</span>
            <span className="text-white/35" title="Binnenkort" aria-disabled>
              EN
            </span>
          </span>
          <Link href="/inschrijven" className="btn btn-primary hidden text-[0.92rem] sm:inline-flex">
            Inschrijven
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
          >
            <span className="relative block h-4 w-5">
              <span className={cn("absolute left-0 top-0 h-0.5 w-5 bg-white transition-transform duration-200 ease-out", mobileOpen && "translate-y-[7px] rotate-45")} />
              <span className={cn("absolute left-0 top-[7px] h-0.5 w-5 bg-white transition-opacity duration-150 ease-out", mobileOpen && "opacity-0")} />
              <span className={cn("absolute left-0 top-[14px] h-0.5 w-5 bg-white transition-transform duration-200 ease-out", mobileOpen && "-translate-y-[7px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      {/* rink-line accent under the bar */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-red/60 to-transparent" />

      {/* Mobile drawer */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        "md:hidden overflow-hidden border-t border-white/10 bg-navy-900 transition-[max-height,opacity] duration-300 ease-drawer",
        open ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
      )}
    >
      <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobiel menu">
        {nav.map((item) =>
          hasChildren(item) ? (
            <details key={item.label} className="group/acc rounded-lg">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-white marker:hidden">
                {item.label}
                <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden className="opacity-70 transition-transform duration-200 ease-out group-open/acc:rotate-180">
                  <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="flex flex-col pb-2 pl-3">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className="rounded-md px-3 py-2.5 text-[0.95rem] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </details>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-lg px-3 py-3 text-base font-semibold text-white/90 hover:bg-white/10"
            >
              {item.label}
            </Link>
          )
        )}
        <Link href="/inschrijven" onClick={onClose} className="btn btn-primary mt-3 justify-center">
          Inschrijven
        </Link>
      </nav>
    </div>
  );
}
