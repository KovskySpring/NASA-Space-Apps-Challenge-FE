import type { ReactNode } from "react";

export default function SimpleBox({
  children,
}: Readonly<{ children?: ReactNode }>) {
  return (
    <div className="m-2 h-fit w-fit rounded-md bg-white p-4 drop-shadow-md">
      {children}
    </div>
  );
}
