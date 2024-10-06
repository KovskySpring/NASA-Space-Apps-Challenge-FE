export default function TextButton({
  title,
  onClick,
  label,
}: Readonly<{ title?: string; onClick?: () => void; label?: string }>) {
  return (
    <button
      type="button"
      title={title}
      className="flex items-center justify-center overflow-hidden rounded-md border-2 border-solid border-black bg-white p-2 drop-shadow-md"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
