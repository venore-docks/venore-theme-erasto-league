import { Sitemap } from "@venore/theme-sdk/ui";
import type { FooterSlotProps } from "@venore/theme-sdk";
import { PlatformBrand } from "./PlatformBrand";

// Faixa navy full-width (mesmo chrome do header — "livro fechado nos dois lados" do conteúdo),
// ecoando a faixa "FUTSAL" do brasão: borda dourada em cima, marca numa placa clara.
export function FooterSlot({ brand, sitemapItems, creditsEnabled }: FooterSlotProps) {
  return (
    <footer className="el-theme-chrome-footer px-6 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-start justify-between gap-8">
        <div className="min-w-0 space-y-3">
          <div className="el-theme-brand-plate inline-block max-w-40 px-3 py-2">
            <PlatformBrand {...brand} isScrolled={false} />
          </div>
          {brand.description.trim().length > 0 && (
            <p className="max-w-[32ch] text-xs text-(--chrome-muted-foreground)">{brand.description}</p>
          )}
        </div>

        {sitemapItems.length > 0 && (
          <div className="flex-1 text-(--chrome-foreground) lg:max-w-2xl [&_a]:text-(--chrome-muted-foreground) [&_a:hover]:text-(--chrome-foreground) [&_p]:text-(--chrome-foreground)">
            <Sitemap items={sitemapItems} />
          </div>
        )}
      </div>

      {creditsEnabled && (
        <div data-credits className="mx-auto mt-6 w-full max-w-6xl border-t border-(--chrome-border) pt-4 text-xs text-(--chrome-muted-foreground)">
          Venore Docks
        </div>
      )}
    </footer>
  );
}
