import type { ThemeShellProps } from "@venore/theme-sdk";
import { ContentSlot } from "./ContentSlot";
import { FooterSlot } from "./FooterSlot";
import { HeaderSlot } from "./HeaderSlot";
import { SidebarSlot } from "./SidebarSlot";

// Header full-width no topo, Sidebar fixa (sem colapso), Footer full-width por baixo de tudo
// (inclusive da sidebar) — Header/Sidebar/Footer formam um "chrome" navy+dourado PRÓPRIO
// (--chrome-*, theme.css), desenhado a partir do brasão do Erasto League, constante independente
// do modo claro/escuro (como um uniforme não muda com a luz do estádio). Só o conteúdo central
// (onde os widgets do plugin vivem) respeita light/dark normalmente. Arranjo de regiões
// deliberadamente convencional — a originalidade está na pele (cor/forma/tipografia), não em
// reinventar onde cada região fica, pra não competir com os widgets do plugin (agenda de jogos,
// classificação, ad do próximo jogo) que já carregam identidade visual forte.
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
