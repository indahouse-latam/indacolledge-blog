"use client";

import { useEffect, useState } from "react";

interface Props {
  generatedToken: string;
  onValidationComplete: () => void;
}

export function TokenValidationForm({
  generatedToken,
  onValidationComplete,
}: Props) {
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleValidateToken = async () => {
    setIsValidating(true);
    setValidationError("");

    try {
      console.log(generatedToken);
      const response = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "validate", token: generatedToken }),
      });

      const data = await response.json();
      setIsValidating(false);

      if (response.ok && data.isValid) {
        onValidationComplete();
      } else {
        setValidationError("Invalid token. Please try again.");
      }
    } catch (error) {
      setIsValidating(false);
      setValidationError("Error validating token. Please try again.");
      console.error("Error validating token:", error);
    }
  };

  useEffect(() => {
    handleValidateToken();
  }, []);

  return (
    <div className="space-y-4">
      {isValidating && !validationError ? (
        <div>Validating invitation token</div>
      ) : (
        <div>Token validated</div>
      )}

      {validationError ? (
        <div>{validationError}</div>
      ) : (
        <div>Token validated successfully</div>
      )}
    </div>
  );
}
