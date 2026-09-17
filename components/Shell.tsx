import type { ThemeShellProps } from "@venore/theme-sdk";
import { ContentSlot } from "./ContentSlot";
import { FooterSlot } from "./FooterSlot";
import { Rail } from "./Rail";

// Shell própria deste tema: uma RAIL vertical única (marca + navegação + usuário, ver Rail.tsx)
// ao lado do conteúdo, em vez do padrão "Header horizontal no topo + Sidebar vertical por baixo
// dele" que os outros temas deste repo usam. Rodapé só sob a coluna de conteúdo (não some atrás
// da rail) — a rail acompanha a altura da página inteira, como uma lombada de livro.
export function Shell({
  header,
  footer,
  sidebarLeft,
  children,
  sidebarContextualEnabled,
  sidebarContextual,
  breadcrumbs,
  breadcrumbsJsonLd,
}: ThemeShellProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col lg:flex-row">
      <Rail header={header} sidebarLeft={sidebarLeft} />
      <div className="flex min-w-0 flex-1 flex-col">
        <ContentSlot
          sidebarContextualEnabled={sidebarContextualEnabled}
          sidebarContextual={sidebarContextual}
          breadcrumbs={breadcrumbs}
          breadcrumbsJsonLd={breadcrumbsJsonLd}
        >
          {children}
        </ContentSlot>
        <FooterSlot {...footer} />
      </div>
    </div>
  );
}
