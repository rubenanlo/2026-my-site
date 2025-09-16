import { clsx } from "clsx";

export default function LayoutSection({
  children,
  topOffset,
  id,
}: {
  children: React.ReactNode;
  topOffset?: number;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={clsx(
        "bg-primary",
        "rounded-t-3xl shadow-2xl flex items-center justify-center border border-foreground-primary/50"
      )}
      style={{
        height: `calc(100svh - ${topOffset}px)`,
      }}
    >
      {children}
    </div>
  );
}
