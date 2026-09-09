export function PageHeader({
  kicker,
  title,
  description,
}: {
  kicker?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="max-w-3xl">
      {kicker ? (
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-rogue-blue">{kicker}</p>
      ) : null}
      <h1 className="mt-3 font-display text-4xl font-semibold uppercase leading-none text-white md:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 max-w-2xl text-lg leading-8 text-rogue-muted">{description}</p>
      ) : null}
    </header>
  );
}
