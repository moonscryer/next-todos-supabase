"use client";

import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

export function SubmitCheckbox({ checked }: { checked: boolean }) {
  const { pending } = useFormStatus();
  const router = useRouter();

  // Refresh page when the action completes
  React.useEffect(() => {
    if (!pending) {
      router.refresh();
    }
  }, [pending, router]);

  return <Checkbox checked={checked} disabled={pending} />;
}
