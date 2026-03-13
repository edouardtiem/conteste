interface BlurredTeaserProps {
  children: React.ReactNode;
  message?: string;
}

export function BlurredTeaser({
  children,
  message = "Contenu verrouille",
}: BlurredTeaserProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="blur-[6px] select-none pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center">
        <span className="text-[32px] mb-2" role="img" aria-label="cadenas">
          🔒
        </span>
        <p className="text-[15px] font-bold text-gris-titre">{message}</p>
      </div>
    </div>
  );
}
