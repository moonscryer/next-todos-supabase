"use client";

type Props = {
  todoId: number;
  checked: string;
};

export default function ToggleButton({ checked }: Props) {
  return (
    <button
      type="submit"
      className="w-6 h-6 rounded border text-sm flex items-center justify-center"
    >
      {checked}
    </button>
  );
}
