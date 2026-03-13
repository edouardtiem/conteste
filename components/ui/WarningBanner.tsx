interface WarningBannerProps {
  title: string;
  children: React.ReactNode;
}

export function WarningBanner({ title, children }: WarningBannerProps) {
  return (
    <div className="bg-orange-fond border-l-4 border-orange-warning rounded-card p-4">
      <p className="text-[15px] font-bold text-orange-warning mb-1">
        {title}
      </p>
      <div className="text-[14px] text-gris-texte">{children}</div>
    </div>
  );
}
