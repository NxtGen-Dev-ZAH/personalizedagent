import type { PropsWithChildren, ReactNode } from "react";

type GlassPanelProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  actionSlot?: ReactNode;
  className?: string;
}>;

export function GlassPanel({
  title,
  subtitle,
  actionSlot,
  className = "",
  children,
}: GlassPanelProps) {
  return (
    <section className={`glass-panel ${className}`}>
      {(title || actionSlot) && (
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            {title && (
              <p className="section-title text-xs tracking-[0.35em]">{title}</p>
            )}
            {subtitle && (
              <p className="mt-1 text-lg font-medium text-white/80">{subtitle}</p>
            )}
          </div>
          {actionSlot}
        </header>
      )}
      {children}
    </section>
  );
}

