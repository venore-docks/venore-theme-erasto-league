import type { SidebarLeftSlotProps } from "@venore/theme-sdk";
import { cn } from "@venore/theme-sdk/ui";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { SidebarNavLink } from "./sidebar-nav-link";
import { AdminNavSwitch } from "./AdminNavSwitch";

// Sidebar fixa, sem colapso (mesma simplicidade do Fearless) — mas chrome navy próprio
// (el-theme-chrome-sidebar, theme.css), não a cor de fundo genérica do conteúdo.
export function SidebarSlot({ enabled, navMode, navItems, navGroups, canToggleAdminNav, onToggleNavMode }: SidebarLeftSlotProps) {
  if (!enabled) return null;

  const isAdmin = navMode === "admin";

  return (
    <MobileNavDrawer
      asideClassName={cn(
        "el-theme-chrome-sidebar relative flex h-full w-full flex-col border-(--chrome-border) py-6 shadow-float lg:w-(--sidebar-width) lg:shrink-0 lg:border-r lg:shadow-none",
        isAdmin && "is-admin",
      )}
    >
      <nav data-nav-mode={navMode} className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
        {isAdmin
          ? navGroups.map((group, index) => (
              <div key={group.key} className="space-y-1 pb-4">
                {index > 0 && <span aria-hidden="true" className="mb-3 block h-px w-full bg-(--chrome-border)" />}
                <p className="px-4 pb-1 text-[11px] font-bold uppercase tracking-caps text-(--chrome-muted-foreground)">{group.label}</p>
                {group.items.map((item) => (
                  <SidebarNavLink key={item.key} item={item} isAdmin />
                ))}
              </div>
            ))
          : navItems.map((item) => <SidebarNavLink key={item.key} item={item} isAdmin={false} />)}

        {isAdmin && navGroups.length === 0 && <p className="px-4 text-sm text-(--chrome-muted-foreground)">—</p>}
        {!isAdmin && navItems.length === 0 && <p className="px-4 text-sm text-(--chrome-muted-foreground)">—</p>}
      </nav>

      {canToggleAdminNav && (
        <div className="mt-3 shrink-0 border-t border-(--chrome-border) pt-3">
          <AdminNavSwitch isAdmin={isAdmin} onToggleNavMode={onToggleNavMode} />
        </div>
      )}
    </MobileNavDrawer>
  );
}
