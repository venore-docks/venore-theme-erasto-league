"use client";

import { Menu, X } from "lucide-react";
import { cn } from "@venore/theme-sdk/ui";
import { toggleMobileNav, useMobileNavOpen } from "./mobile-nav-store";

export function MobileNavToggleButton() {
  const isOpen = useMobileNavOpen();

  return (
    <button
      type="button"
      onClick={toggleMobileNav}
      aria-label={isOpen ? "Fechar navegação" : "Abrir navegação"}
      aria-expanded={isOpen}
      className={cn(
        "ui-icon-button-lg ui-motion-base outline-none hover:bg-accent/14 active:bg-accent/14 focus-visible:ring-2 focus-visible:ring-ring lg:hidden",
        "group-data-[scrolled=true]/header:hover:bg-primary-foreground/10 group-data-[scrolled=true]/header:active:bg-primary-foreground/10",
      )}
    >
      {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
    </button>
  );
}
