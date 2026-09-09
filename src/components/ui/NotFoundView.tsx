import { Button } from "@/components/ui/Button";

export function NotFoundView() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-rogue-blue">404</p>
      <h1 className="mt-4 font-display text-5xl uppercase text-white md:text-7xl">
        This road doesn&apos;t exist.
      </h1>
      <p className="mt-5 max-w-lg text-rogue-muted">
        The page you&apos;re looking for couldn&apos;t be found.
      </p>
      <div className="mt-8">
        <Button href="/">Return home</Button>
      </div>
    </div>
  );
}
