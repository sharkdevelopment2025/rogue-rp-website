import { Button } from "@/components/ui/Button";

export function ErrorState({
  title = "Something went wrong.",
  message = "Rogue RP was unable to load this page.",
  retryHref,
}: {
  title?: string;
  message?: string;
  retryHref?: string;
}) {
  return (
    <div className="panel mx-auto max-w-xl px-8 py-12 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-rogue-danger">Error</p>
      <h1 className="mt-4 font-display text-4xl uppercase text-white">{title}</h1>
      <p className="mt-4 text-rogue-muted">{message}</p>
      <div className="mt-8 flex justify-center gap-3">
        {retryHref ? <Button href={retryHref}>Try again</Button> : null}
        <Button href="/" variant="secondary">
          Return home
        </Button>
      </div>
    </div>
  );
}
