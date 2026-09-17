import Link from "next/link";
import type { HeaderSlotProps, SidebarLeftSlotProps } from "@venore/theme-sdk";
import { cn } from "@venore/theme-sdk/ui";
import { PlatformBrand } from "./PlatformBrand";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { MobileNavToggleButton } from "./MobileNavToggleButton";
import { RailNavLink } from "./rail-nav-link";
import { AdminNavSwitch } from "./AdminNavSwitch";
import { UserMenu } from "./UserMenu";

// A shell "única" deste tema: NÃO existe uma faixa de Header horizontal cobrindo o topo (como
// todo outro tema neste repo) + uma Sidebar vertical por baixo dela como uma segunda região —
// marca, navegação e usuário vivem juntos numa RAIL vertical só, de altura cheia, ao lado do
// conteúdo (não embaixo de um header). Em telas estreitas (abaixo de lg) a rail vira o mesmo
// drawer off-canvas de sempre (MobileNavDrawer, mecânica compartilhada — foco/scroll-lock não
// precisam ser reinventados só porque o layout é outro), disparado por uma topbar fina que SÓ
// existe no mobile (o desktop não tem barra de topo nenhuma).
export function Rail({
  header,
  sidebarLeft,
}: {
  header: HeaderSlotProps;
  sidebarLeft: SidebarLeftSlotProps;
}) {
  const { brand, userbarEnabled, headerNavItems, user, canAccessAdmin, onSignOut } = header;
  const { enabled, navMode, navItems, navGroups, canToggleAdminNav, onToggleNavMode } = sidebarLeft;
  const isAdmin = navMode === "admin";

  const brandLink = (
    <Link href="/" aria-label={brand.name} className="el-theme-brand-plate inline-flex items-center gap-2 px-3 py-1.5">
      <PlatformBrand {...brand} isScrolled={false} />
    </Link>
  );

  return (
    <>
      {/* topbar — só existe abaixo de lg (o desktop não tem faixa de topo, só a rail). */}
      <div className="el-theme-rail-topbar flex h-14 shrink-0 items-center gap-3 px-4 lg:hidden">
        {enabled && <MobileNavToggleButton />}
        {brandLink}
      </div>

      {!enabled ? null : (
        <MobileNavDrawer asideClassName={cn("el-theme-rail flex h-full w-full flex-col lg:w-(--sidebar-width) lg:shrink-0", isAdmin && "is-admin")}>
          <div className="hidden shrink-0 px-5 pt-6 pb-4 lg:block">{brandLink}</div>

          {headerNavItems.length > 0 && (
            <nav className="flex shrink-0 flex-wrap gap-x-4 gap-y-1 border-b border-(--chrome-border) px-5 pb-4 pt-2 text-xs lg:pt-0">
              {headerNavItems.map((item) => (
                <a key={item.key} href={item.href} className="el-theme-quicklink ui-motion-base outline-none">
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          <nav data-nav-mode={navMode} className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto py-4">
            {isAdmin
              ? navGroups.map((group, index) => (
                  <div key={group.key} className="space-y-1 pb-4">
                    {index > 0 && <span aria-hidden="true" className="mb-3 block h-px w-full bg-(--chrome-border)" />}
                    <p className="px-5 pb-1 text-[11px] font-semibold uppercase tracking-caps text-(--chrome-muted-foreground)">
                      {group.label}
                    </p>
                    {group.items.map((item) => (
                      <RailNavLink key={item.key} item={item} isAdmin />
                    ))}
                  </div>
                ))
              : navItems.map((item) => <RailNavLink key={item.key} item={item} isAdmin={false} />)}

            {isAdmin && navGroups.length === 0 && <p className="px-5 text-sm text-(--chrome-muted-foreground)">—</p>}
            {!isAdmin && navItems.length === 0 && <p className="px-5 text-sm text-(--chrome-muted-foreground)">—</p>}
          </nav>

          <div className="shrink-0 space-y-2 border-t border-(--chrome-border) px-3 py-3">
            {canToggleAdminNav && <AdminNavSwitch isAdmin={isAdmin} onToggleNavMode={onToggleNavMode} />}
            {userbarEnabled &&
              (user ? (
                <UserMenu user={user} canAccessAdmin={canAccessAdmin} onSignOut={onSignOut} />
              ) : (
                <Link href="/login" className="el-theme-quicklink block px-2 py-1.5 text-sm ui-motion-base outline-none">
                  Entrar
                </Link>
              ))}
          </div>
        </MobileNavDrawer>
      )}
    </>
  );
}
