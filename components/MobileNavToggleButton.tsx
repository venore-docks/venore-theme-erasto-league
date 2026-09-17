"use client";

import { Menu, X } from "lucide-react";
import { toggleMobileNav, useMobileNavOpen } from "./mobile-nav-store";

// Sempre sobre o header navy (el-theme-chrome-header) — a cor do ícone vem por herança de
// `color: var(--chrome-foreground)` do header, não precisa declarar de novo aqui.
export function MobileNavToggleButton() {
  const isOpen = useMobileNavOpen();

  return (
    <button
      type="button"
      onClick={toggleMobileNav}
      aria-label={isOpen ? "Fechar navegação" : "Abrir navegação"}
      aria-expanded={isOpen}
      className="ui-icon-button-lg ui-motion-base outline-none hover:bg-(--chrome-bg-elevated) active:bg-(--chrome-bg-elevated) focus-visible:ring-2 focus-visible:ring-(--chrome-accent) lg:hidden"
    >
      {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
    </button>
  );
}
