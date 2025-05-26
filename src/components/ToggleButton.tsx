"use client";

import { useFormStatus } from "react-dom";

interface ToggleButtonProps {
  todoId: number;
  checked: string;
  toggleAction: () => Promise<void>;
}

export default function ToggleButton({
  checked,
  toggleAction,
}: ToggleButtonProps) {
  const { pending } = useFormStatus();

  return (
    <form action={toggleAction} method="post" className="m-0 p-0">
      <button
        type="submit"
        disabled={pending}
        aria-pressed={!!checked}
        aria-label={
          checked ? "Mark todo as incomplete" : "Mark todo as complete"
        }
        className={`w-6 h-6 rounded border flex items-center justify-center cursor-pointer ${
          checked
            ? "bg-blue-600 border-blue-600 text-white"
            : "bg-white border-gray-400"
        }`}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>
    </form>
  );
}
