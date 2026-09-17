"use client";

import { Menu, X } from "lucide-react";
import { toggleMobileNav, useMobileNavOpen } from "./mobile-nav-store";

// Só aparece na topbar mobile (Rail.tsx, abaixo de lg) — cor do ícone vem por herança de
// `color: var(--chrome-foreground)` do chrome, não precisa declarar de novo aqui.
export function MobileNavToggleButton() {
  const isOpen = useMobileNavOpen();

  return (
    <button
      type="button"
      onClick={toggleMobileNav}
      aria-label={isOpen ? "Fechar navegação" : "Abrir navegação"}
      aria-expanded={isOpen}
      className="ui-icon-button-lg ui-motion-base outline-none hover:bg-(--chrome-bg-elevated) active:bg-(--chrome-bg-elevated) focus-visible:ring-2 focus-visible:ring-(--chrome-accent)"
    >
      {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
    </button>
  );
}
