import { Sitemap } from "@venore/theme-sdk/ui";
import type { FooterSlotProps } from "@venore/theme-sdk";
import { PlatformBrand } from "./PlatformBrand";

// Faixa full-width calma. A marca é o logo real do site (PlatformBrand), não texto.
export function FooterSlot({ brand, sitemapItems, creditsEnabled }: FooterSlotProps) {
  return (
    <footer className="border-t border-border bg-card px-6 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-start justify-between gap-8">
        <div className="min-w-0 space-y-3">
          <div className="max-w-40">
            <PlatformBrand {...brand} isScrolled={false} />
          </div>
          {brand.description.trim().length > 0 && <p className="max-w-[32ch] text-xs text-muted-foreground">{brand.description}</p>}
        </div>

        {sitemapItems.length > 0 && (
          <div className="flex-1 lg:max-w-2xl">
            <Sitemap items={sitemapItems} />
          </div>
        )}
      </div>

      {creditsEnabled && (
        <div data-credits className="mx-auto mt-6 w-full max-w-6xl border-t border-border pt-4 text-xs text-muted-foreground">
          Venore Docks
        </div>
      )}
    </footer>
  );
}
