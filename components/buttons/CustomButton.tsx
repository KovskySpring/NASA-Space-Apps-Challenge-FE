import type { ReactNode } from "react";

export default function CustomButton({
  title,
  className,
  onClick,
  children,
}: Readonly<{
  className?: string;
  title?: string;
  onClick?: () => void;
  children?: ReactNode;
}>) {
  return (
    <button
      type="button"
      title={title}
      className={
        className ??
        "flex items-center justify-center overflow-hidden rounded-md bg-white p-2 transition-all hover:drop-shadow-md focus:drop-shadow-md"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
