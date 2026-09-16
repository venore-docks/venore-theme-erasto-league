// Tooltip CSS-only pro rótulo escondido no estado colapsado da sidebar. O próprio rótulo vira o
// conteúdo flutuante — sem duplicar texto pra leitor de tela, sem JS. Compartilhado entre
// SidebarNavLink e o botão de alternância site/admin.
export const SIDEBAR_COLLAPSE_TOOLTIP_LABEL_CLASSES =
  "overflow-hidden whitespace-nowrap max-w-[180px] translate-x-0 opacity-100 ui-motion-emphasis";

export const SIDEBAR_COLLAPSE_TOOLTIP_COLLAPSED_CLASSES =
  "lg:pointer-events-none lg:max-w-0 lg:-translate-x-2 lg:opacity-0 " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:pointer-events-auto " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:absolute " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:top-1/2 " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:left-full " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:z-50 " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:ml-2 " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:max-w-none " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:-translate-y-1/2 " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:translate-x-0 " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:rounded-lg " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:border " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:border-border " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:bg-popover " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:px-2 " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:py-1 " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:text-popover-foreground " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:opacity-100 " +
  "lg:group-[:is(:hover,:focus-visible)]/sidebar-collapse-target:shadow-float";
