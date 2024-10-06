export default function TextButton({
  disabled,
  title,
  onClick,
  label,
}: Readonly<{
  disabled?: boolean;
  title?: string;
  onClick?: () => void;
  label?: string;
}>) {
  return (
    <button
      disabled={disabled}
      type="button"
      title={title}
      className="flex items-center justify-center overflow-hidden rounded-md border-2 border-solid border-black bg-white p-2 drop-shadow-md disabled:cursor-not-allowed disabled:border-dashed disabled:opacity-50 disabled:drop-shadow-none"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
