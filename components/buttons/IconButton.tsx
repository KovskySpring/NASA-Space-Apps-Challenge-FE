import type { ReactNode } from "react";

export default function IconButton({
  title,
  onClick,
  children,
}: Readonly<{ title?: string; onClick?: () => void; children?: ReactNode }>) {
  return (
    <button
      type="button"
      title={title}
      className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-white p-2 transition-all hover:drop-shadow-md focus:drop-shadow-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
