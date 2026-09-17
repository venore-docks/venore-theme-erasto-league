import Link from "next/link";
import type { HeaderSlotProps } from "@venore/theme-sdk";
import { PlatformBrand } from "./PlatformBrand";
import { MobileNavToggleButton } from "./MobileNavToggleButton";
import { UserMenu } from "./UserMenu";

// Header original do Erasto League — navy fixo (--chrome-*, não amarrado a light/dark, ver
// theme.css) com borda dourada embaixo, brasão numa placa clara (o PNG do brasão já é colorido —
// uma placa garante contraste com qualquer fundo do arquivo) e nav em caixa alta com sublinhado
// dourado no hover/ativo, igual uma aba de placar.
export function HeaderSlot({ brand, userbarEnabled, headerNavItems, user, canAccessAdmin, onSignOut }: HeaderSlotProps) {
  return (
    <header className="el-theme-chrome-header sticky top-0 z-40 flex h-[4.5rem] shrink-0 items-center justify-between gap-6 px-4 shadow-header sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <MobileNavToggleButton />
        <Link href="/" aria-label={brand.name} className="el-theme-brand-plate inline-flex min-w-0 items-center gap-2 px-3 py-1.5">
          <PlatformBrand {...brand} isScrolled={false} />
        </Link>
      </div>

      {headerNavItems.length > 0 && (
        <nav className="hidden flex-1 items-center justify-center gap-6 md:flex">
          {headerNavItems.map((item) => (
            <a key={item.key} href={item.href} className="el-theme-nav-link py-2 text-xs ui-motion-base outline-none">
              {item.label}
            </a>
          ))}
        </nav>
      )}

      {userbarEnabled ? (
        user ? (
          <UserMenu user={user} canAccessAdmin={canAccessAdmin} onSignOut={onSignOut} />
        ) : (
          <Link href="/login" className="el-theme-nav-link py-2 text-xs ui-motion-base outline-none">
            Entrar
          </Link>
        )
      ) : null}
    </header>
  );
}
