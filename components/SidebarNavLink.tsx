"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MainNavItem } from "@venore/theme-sdk";
import { cn } from "@venore/theme-sdk/ui";
import { NavIcon } from "@venore/theme-sdk/ui";
import { SIDEBAR_COLLAPSE_TOOLTIP_COLLAPSED_CLASSES, SIDEBAR_COLLAPSE_TOOLTIP_LABEL_CLASSES } from "./sidebar-collapse-tooltip";

function isDescendantActive(item: MainNavItem, pathname: string | null): boolean {
  if (item.href === null) {
    return item.children.some((child) => isDescendantActive(child, pathname));
  }
  return item.href === pathname;
}

export function SidebarNavLink({ item, collapsed, isAdmin }: { item: MainNavItem; collapsed: boolean; isAdmin: boolean }) {
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
          className={cn(
            "group/sidebar-collapse-target relative flex w-full items-center gap-3 px-3 py-3 text-left text-sm font-medium ui-motion-base outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isActiveAncestor ? "text-primary" : "text-muted-foreground",
            isAdmin
              ? "hover:bg-muted hover:text-foreground active:bg-muted active:text-foreground"
              : "hover:bg-accent/14 hover:text-primary active:bg-accent/14 active:text-primary",
          )}
        >
          <span aria-hidden="true" className="inline-flex size-5 shrink-0 items-center justify-center">
            <NavIcon iconKey={item.icon} className="size-4 shrink-0" />
          </span>
          <span
            className={cn(
              "flex-1",
              SIDEBAR_COLLAPSE_TOOLTIP_LABEL_CLASSES,
              collapsed && SIDEBAR_COLLAPSE_TOOLTIP_COLLAPSED_CLASSES,
            )}
          >
            {item.label}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-4 shrink-0 ui-motion-base",
              expanded && "rotate-180",
              collapsed && SIDEBAR_COLLAPSE_TOOLTIP_COLLAPSED_CLASSES,
            )}
          />
        </button>
        {expanded && (
          <div id={contentId} className={cn("ml-8 space-y-1", collapsed && "lg:ml-0")}>
            {item.children.map((child) => (
              <SidebarNavLink key={child.key} item={child} collapsed={collapsed} isAdmin={isAdmin} />
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
      className={cn(
        "group/sidebar-collapse-target relative flex items-center gap-3 px-3 py-3 text-sm font-medium ui-motion-base outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive ? "bg-accent/14 text-primary" : "text-muted-foreground",
        isAdmin ? "hover:bg-muted hover:text-foreground active:bg-muted active:text-foreground" : "hover:bg-accent/14 hover:text-primary active:bg-accent/14 active:text-primary",
      )}
    >
      <span aria-hidden="true" className="inline-flex size-5 shrink-0 items-center justify-center">
        <NavIcon iconKey={item.icon} className="size-4 shrink-0" />
      </span>
      <span className={cn(SIDEBAR_COLLAPSE_TOOLTIP_LABEL_CLASSES, collapsed && SIDEBAR_COLLAPSE_TOOLTIP_COLLAPSED_CLASSES)}>
        {item.label}
      </span>
    </Link>
  );
}
