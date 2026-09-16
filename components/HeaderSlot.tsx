import Link from "next/link";
import type { HeaderSlotProps } from "@venore/theme-sdk";
import { PlatformBrand } from "./PlatformBrand";
import { MobileNavToggleButton } from "./MobileNavToggleButton";
import { UserMenu } from "./UserMenu";

// Faixa única full-width, sem encolher ao rolar. A marca é o logo real do site (PlatformBrand).
export function HeaderSlot({ brand, userbarEnabled, headerNavItems, user, canAccessAdmin, onSignOut }: HeaderSlotProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-6 border-b border-border bg-card px-4 text-foreground shadow-header sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <MobileNavToggleButton />
        <Link href="/" aria-label={brand.name} className="py-2 inline-flex min-w-0 items-center gap-2">
          <PlatformBrand {...brand} isScrolled={false} />
        </Link>
      </div>

      {headerNavItems.length > 0 && (
        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {headerNavItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground ui-motion-base outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}

      {userbarEnabled ? (
        user ? (
          <UserMenu user={user} canAccessAdmin={canAccessAdmin} onSignOut={onSignOut} />
        ) : (
          <Link
            href="/login"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground ui-motion-base outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            Entrar
          </Link>
        )
      ) : null}
    </header>
  );
}
