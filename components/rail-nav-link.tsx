"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MainNavItem } from "@venore/theme-sdk";
import { cn } from "@venore/theme-sdk/ui";
import { NavIcon } from "@venore/theme-sdk/ui";

// Item de nav da Rail única (components/Rail.tsx) — vive sobre o chrome (el-theme-rail,
// theme.css), não sobre --background, por isso usa el-theme-rail-link (--chrome-*), não
// text-muted-foreground/bg-accent. Accordion idêntico ao padrão dos outros temas (aria-current/
// estado inicial corretos no primeiro HTML).
function isDescendantActive(item: MainNavItem, pathname: string | null): boolean {
  if (item.href === null) {
    return item.children.some((child) => isDescendantActive(child, pathname));
  }
  return item.href === pathname;
}

export function RailNavLink({ item, isAdmin }: { item: MainNavItem; isAdmin: boolean }) {
  const pathname = usePathname();
  const isActiveAncestor = item.href === null && isDescendantActive(item, pathname);
  const [expanded, setExpanded] = useState(isActiveAncestor);

  if (item.href === null) {
    const contentId = `rail-nav-group-${item.key}`;

    return (
      <div>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={contentId}
          data-active-ancestor={isActiveAncestor ? "true" : undefined}
          className="el-theme-rail-link flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium ui-motion-base outline-none"
        >
          <span aria-hidden="true" className="inline-flex size-5 shrink-0 items-center justify-center">
            <NavIcon iconKey={item.icon} className="size-4 shrink-0" />
          </span>
          <span className="flex-1 truncate">{item.label}</span>
          <ChevronDown aria-hidden="true" className={cn("size-4 shrink-0 ui-motion-base", expanded && "rotate-180")} />
        </button>
        {expanded && (
          <div id={contentId} className="ml-8 space-y-1">
            {item.children.map((child) => (
              <RailNavLink key={child.key} item={child} isAdmin={isAdmin} />
            ))}
          </div>
        )}
      </div>
    );
  }

  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className="el-theme-rail-link flex items-center gap-3 px-4 py-2.5 text-sm font-medium ui-motion-base outline-none"
    >
      <span aria-hidden="true" className="inline-flex size-5 shrink-0 items-center justify-center">
        <NavIcon iconKey={item.icon} className="size-4 shrink-0" />
      </span>
      <span className="truncate">{item.label}</span>
    </Link>
  );
}
