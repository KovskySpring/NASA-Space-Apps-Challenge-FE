import type { RangedValue } from "@/constants/Plants";

export default function RangedValueViewer({
  data: { unit, min, max },
}: Readonly<{
  data: RangedValue;
}>) {
  return (
    <div>
      <span>Range:</span>
      <span>
        {min} ({unit})
      </span>
      <span>to</span>
      <span>
        {max} ({unit})
      </span>
    </div>
  );
}
