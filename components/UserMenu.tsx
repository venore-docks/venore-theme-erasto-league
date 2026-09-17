"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { HeaderUserInfo, NavItem } from "@venore/theme-sdk";
import { Avatar, AvatarFallback, AvatarImage } from "@venore/theme-sdk/ui";
import { ColorModeToggle } from "@venore/theme-sdk/ui";

function initials(displayName: string) {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase() || "?";
}

type UserMenuProps = {
  user: HeaderUserInfo;
  canAccessAdmin: boolean;
  onSignOut: () => Promise<void>;
  userNavItems?: NavItem[];
};

export function UserMenu({ user, canAccessAdmin, onSignOut, userNavItems = [] }: UserMenuProps) {
  const firstName = user.displayName.split(/\s+/)[0];
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const details = detailsRef.current;
      if (!details || !details.open) return;
      if (event.target instanceof Node && !details.contains(event.target)) {
        details.open = false;
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <details ref={detailsRef} className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl px-1.5 py-1 text-(--chrome-foreground) ui-motion-base outline-none hover:bg-(--chrome-bg-elevated) active:bg-(--chrome-bg-elevated) focus-visible:ring-2 focus-visible:ring-(--chrome-accent) [&::-webkit-details-marker]:hidden">
        <Avatar>
          {user.imageUrl ? <AvatarImage src={user.imageUrl} alt={user.displayName} /> : null}
          <AvatarFallback>{initials(user.displayName)}</AvatarFallback>
        </Avatar>
        <span className="hidden text-sm font-medium sm:inline">{firstName}</span>
      </summary>

      <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-panel border border-border bg-card p-3 text-foreground shadow-float">
        <div className="border-b border-border pb-3">
          <p className="truncate text-sm font-semibold">{user.displayName}</p>
          {user.email ? <p className="truncate text-xs text-muted-foreground">{user.email}</p> : null}
        </div>

        <div className="flex flex-col gap-1 py-2">
          <ColorModeToggle className="w-full rounded-xl px-2 py-1.5 text-left text-sm text-muted-foreground ui-motion-base outline-none hover:bg-accent/14 hover:text-foreground active:bg-accent/14 active:text-foreground focus-visible:ring-2 focus-visible:ring-ring" />

          {canAccessAdmin ? (
            <Link
              href="/admin"
              className="rounded-xl px-2 py-1.5 text-sm text-muted-foreground ui-motion-base outline-none hover:bg-accent/14 hover:text-foreground active:bg-accent/14 active:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              Administração
            </Link>
          ) : null}

          <Link
            href="/account"
            className="rounded-xl px-2 py-1.5 text-sm text-muted-foreground ui-motion-base outline-none hover:bg-accent/14 hover:text-foreground active:bg-accent/14 active:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            Minha conta
          </Link>

          {userNavItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-xl px-2 py-1.5 text-sm text-muted-foreground ui-motion-base outline-none hover:bg-accent/14 hover:text-foreground active:bg-accent/14 active:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <form action={onSignOut} className="border-t border-border pt-2">
          <button
            type="submit"
            className="w-full rounded-xl px-2 py-1.5 text-left text-sm font-medium text-muted-foreground ui-motion-base outline-none hover:bg-accent/14 hover:text-foreground active:bg-accent/14 active:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            Sair
          </button>
        </form>
      </div>
    </details>
  );
}
