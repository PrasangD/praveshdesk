export function PageIntro({ title, children }: { title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="border-b border-rule bg-register/60">
      <div className="container-page py-14 sm:py-20">
        <h1 className="max-w-3xl text-[2.35rem] font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-xl leading-relaxed">{children}</div>}
      </div>
    </section>
  );
}

export function Section({
  title,
  intro,
  children,
  id,
  className = "",
}: {
  title?: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-20 ${className}`}>
      <div className="container-page">
        {title && <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-[2.5rem]">{title}</h2>}
        {intro && <div className="mt-4 max-w-2xl text-lg">{intro}</div>}
        <div className={title || intro ? "mt-10" : ""}>{children}</div>
      </div>
    </section>
  );
}
