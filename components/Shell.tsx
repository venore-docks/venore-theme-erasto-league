import type { ThemeShellProps } from "@venore/theme-sdk";
import { ContentSlot } from "./ContentSlot";
import { FooterSlot } from "./FooterSlot";
import { HeaderSlot } from "./HeaderSlot";
import { SidebarSlot } from "./SidebarSlot";

// Header full-width no topo, Sidebar fixa (sem colapso — mesma simplicidade do Fearless), Footer
// full-width por baixo de tudo (inclusive da sidebar). A identidade esportiva/premium deste tema
// vem inteira de theme.css (verde de campo + dourado de troféu, pílula nos botões, "linha de
// campo" no topo dos cards) — o arranjo de regiões é deliberadamente sóbrio, pra não competir com
// os widgets do plugin (agenda de jogos, classificação, ad do próximo jogo) que já carregam a
// identidade visual forte.
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
    <div className="flex min-h-full flex-1 flex-col">
      <HeaderSlot {...header} />
      <div className="flex flex-1">
        <SidebarSlot {...sidebarLeft} />
        <ContentSlot
          sidebarContextualEnabled={sidebarContextualEnabled}
          sidebarContextual={sidebarContextual}
          breadcrumbs={breadcrumbs}
          breadcrumbsJsonLd={breadcrumbsJsonLd}
        >
          {children}
        </ContentSlot>
      </div>
      <FooterSlot {...footer} />
    </div>
  );
}
