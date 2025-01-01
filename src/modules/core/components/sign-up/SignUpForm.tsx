"use client";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

interface Props {
  onValidationComplete: () => void;
}

export function TokenValidationForm({ onValidationComplete }: Props) {
  const [token, setToken] = useState("");
  const [generatedToken, setGeneratedToken] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleGenerateToken = async () => {
    try {
      const response = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate" }),
      });
      const data = await response.json();
      if (response.ok) {
        setGeneratedToken(data.token);
      } else {
        console.error("Error generating token:", data.error);
      }
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };

  const handleValidateToken = async () => {
    setIsValidating(true);
    setValidationError("");

    try {
      const response = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "validate", token }),
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

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Enter the auth token"
        value={token}
        variant="bordered"
        radius="full"
        onChange={(e) => setToken(e.target.value)}
        className="w-full"
        classNames={{
          inputWrapper: "border border-primary py-6",
        }}
      />
      {validationError && (
        <p className="text-red-500 text-sm">{validationError}</p>
      )}
      <Button
        onPress={handleValidateToken}
        radius="full"
        disabled={!token || isValidating}
        className="w-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isValidating ? "Validating..." : "Validate Token"}
      </Button>
      <Button
        onPress={handleGenerateToken}
        radius="full"
        className="w-full mt-2 bg-secondary text-white"
      >
        Generate Token
      </Button>
      {generatedToken && (
        <div className="mt-4 p-2 border rounded bg-gray-50">
          <p className="text-sm">Generated Token:</p>
          <p className="text-xs break-all">{generatedToken}</p>
        </div>
      )}
    </div>
  );
}
