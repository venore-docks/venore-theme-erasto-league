"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MainNavItem } from "@venore/theme-sdk";
import { cn } from "@venore/theme-sdk/ui";
import { NavIcon } from "@venore/theme-sdk/ui";

// Versão própria do Erasto League (não a do Fearless): o link vive sobre o chrome navy da
// sidebar (el-theme-chrome-sidebar, theme.css), não sobre --background — por isso usa as
// classes el-theme-sidebar-link (--chrome-muted-foreground/--chrome-accent), não
// text-muted-foreground/bg-accent. Mecânica de accordion idêntica à do Fearless (mesmo
// raciocínio: aria-current/estado inicial corretos no primeiro HTML).
function isDescendantActive(item: MainNavItem, pathname: string | null): boolean {
  if (item.href === null) {
    return item.children.some((child) => isDescendantActive(child, pathname));
  }
  return item.href === pathname;
}

export function SidebarNavLink({ item, isAdmin }: { item: MainNavItem; isAdmin: boolean }) {
  const pathname = usePathname();
  const isActiveAncestor = item.href === null && isDescendantActive(item, pathname);
  const [expanded, setExpanded] = useState(isActiveAncestor);

  if (item.href === null) {
    const contentId = `sidebar-nav-group-${item.key}`;

    return (
      <div>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={contentId}
          data-active-ancestor={isActiveAncestor ? "true" : undefined}
          className="el-theme-sidebar-link flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide ui-motion-base outline-none"
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
              <SidebarNavLink key={child.key} item={child} isAdmin={isAdmin} />
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
      className="el-theme-sidebar-link flex items-center gap-3 px-4 py-3 text-sm font-semibold uppercase tracking-wide ui-motion-base outline-none"
    >
      <span aria-hidden="true" className="inline-flex size-5 shrink-0 items-center justify-center">
        <NavIcon iconKey={item.icon} className="size-4 shrink-0" />
      </span>
      <span className="truncate">{item.label}</span>
    </Link>
  );
}
