"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { useAuthStore } from "@/modules/auth/store/user-store";
import { updateArticleStatus } from "@/app/actions/course";

const STATUS_OPTIONS = [
  { value: "created", label: "Created" },
  { value: "pending", label: "Pending" },
  { value: "published", label: "Published" },
];

interface StatusSelectorProps {
  postStatus: string;
  articleId: string;
  initialStatus: string;
}

export const StatusSelector = ({
  postStatus,
  articleId,
  initialStatus,
}: StatusSelectorProps) => {
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuthStore((state) => state.user);

  const isAdmin = user?.role === "admin";
  const canChangeStatus =
    isAdmin && ["created", "pending"].includes(postStatus);

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true);
    try {
      const result = await updateArticleStatus(articleId, newStatus);
      if (result.success) {
        setStatus(newStatus);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {canChangeStatus && (
        <div className="max-w-xs">
          <Select
            label="Article Status"
            selectedKeys={[status]}
            onChange={(e) => handleStatusChange(e.target.value)}
            isDisabled={isLoading}
          >
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      )}
    </>
  );
};
