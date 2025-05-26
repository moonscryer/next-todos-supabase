"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "destructive" | "ghost";
  size?: "default" | "sm" | "icon";
  ariaLabel?: string;
}

export function SubmitButton({ children, variant, size, ariaLabel }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      aria-label={ariaLabel}
      disabled={pending}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
