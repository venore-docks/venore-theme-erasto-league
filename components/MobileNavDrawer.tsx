"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@venore/theme-sdk/ui";
import { closeMobileNav, getMobileNavTrigger, useMobileNavOpen } from "./mobile-nav-store";

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// 1024px == breakpoint `lg`. Só abaixo disso o painel é de fato off-canvas.
const OFF_CANVAS_MEDIA_QUERY = "(min-width: 1024px)";

export function MobileNavDrawer({ children, asideClassName }: { children: ReactNode; asideClassName: string }) {
  const isOpen = useMobileNavOpen();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMobileNav();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (window.matchMedia(OFF_CANVAS_MEDIA_QUERY).matches) return;

    const panel = panelRef.current;
    if (!panel) return;

    const getFocusable = () => Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    getFocusable()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      getMobileNavTrigger()?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    const { body } = document;
    const previousPosition = body.style.position;
    const previousTop = body.style.top;
    const previousWidth = body.style.width;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      body.style.position = previousPosition;
      body.style.top = previousTop;
      body.style.width = previousWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Fechar navegação"
          onClick={closeMobileNav}
          className="fixed inset-0 z-40 bg-popover/80 lg:hidden"
        />
      )}
      <div
        ref={panelRef}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 max-w-[85vw] ui-motion-emphasis",
          "lg:static lg:z-auto lg:w-auto lg:max-w-none lg:shrink-0 lg:translate-x-0 lg:transition-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <aside className={cn(asideClassName, "overscroll-contain")}>{children}</aside>
      </div>
    </>
  );
}
