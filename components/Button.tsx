import clsx from "clsx";

export default function Button({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default";
}) {
  const variants = {
    default:
      "px-10 py-3 bg-foreground-primary rounded-md text-primary font-bold",
  };
  return (
    <button className={clsx(variants[variant], className)}>{children}</button>
  );
}
