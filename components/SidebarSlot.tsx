import type { SidebarLeftSlotProps } from "@venore/theme-sdk";
import { cn } from "@venore/theme-sdk/ui";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { SidebarNavLink } from "./SidebarNavLink";
import { AdminNavSwitch } from "./AdminNavSwitch";

// Sidebar fixa, sem colapso — uma única largura, sempre com rótulo visível.
export function SidebarSlot({ enabled, navMode, navItems, navGroups, canToggleAdminNav, onToggleNavMode }: SidebarLeftSlotProps) {
  if (!enabled) return null;

  const isAdmin = navMode === "admin";

  return (
    <MobileNavDrawer
      asideClassName={cn(
        "relative flex h-full w-full flex-col px-4 py-6 text-foreground shadow-float lg:w-(--sidebar-width) lg:shrink-0 lg:border-r lg:shadow-none",
        isAdmin ? "border-ring bg-(image:--sidebar-bg-admin)" : "border-border bg-(image:--sidebar-bg)",
      )}
    >
      <nav data-nav-mode={navMode} className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
        {isAdmin
          ? navGroups.map((group, index) => (
              <div key={group.key} className="space-y-1 pb-4">
                {index > 0 && <span aria-hidden="true" className="mb-3 block h-px w-full bg-border" />}
                <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-caps text-muted-foreground/70">{group.label}</p>
                {group.items.map((item) => (
                  <SidebarNavLink key={item.key} item={item} collapsed={false} isAdmin />
                ))}
              </div>
            ))
          : navItems.map((item) => <SidebarNavLink key={item.key} item={item} collapsed={false} isAdmin={false} />)}

        {isAdmin && navGroups.length === 0 && <p className="px-3 text-sm text-muted-foreground/56">—</p>}
        {!isAdmin && navItems.length === 0 && <p className="px-3 text-sm text-muted-foreground/56">—</p>}
      </nav>

      {canToggleAdminNav && (
        <div className="mt-3 shrink-0 border-t border-border pt-3">
          <AdminNavSwitch isAdmin={isAdmin} onToggleNavMode={onToggleNavMode} />
        </div>
      )}
    </MobileNavDrawer>
  );
}
