"use client";

import React, { useState } from "react";
import { Chip, Spinner } from "@nextui-org/react";
import { useRouter } from "@/modules/translations/i18n/routing";
import { useSearchParams } from "next/navigation";
import { updateStatusInURL } from "../../services/statusService";
import { STATUS_OPTIONS } from "@/utils/constants/article-statuses";
import { chipStyles } from "../../utils/chipStyles";
import { CheckIcon } from "@/modules/common/components/CheckIcon";
import { useAuthStore } from "@/modules/auth/store/user-store";

interface AdminFilterByStatusProps {
  status?: string;
}

export const AdminFilterByStatus = ({ status }: AdminFilterByStatusProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const user = useAuthStore((state) => state.user);

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true);
    try {
      await updateStatusInURL(status, newStatus, searchParams, router);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {user?.role === "admin" ? (
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((option) => {
              const isSelected = status === option.value;
              const styles = chipStyles({ isSelected });

              return (
                <Chip
                  key={option.value}
                  className={styles}
                  color="primary"
                  startContent={
                    isSelected ? (
                      <CheckIcon className="ml-1" />
                    ) : isLoading ? (
                      <Spinner className="ml-1" />
                    ) : null
                  }
                  variant="faded"
                  onClick={() => handleStatusChange(option.value)}
                >
                  {option.label}
                </Chip>
              );
            })}
          </div>
          {status && (
            <p className="mt-4 ml-1 text-default-500">
              Filter by:{" "}
              {STATUS_OPTIONS.find((opt) => opt.value === status)?.label}
            </p>
          )}
        </div>
      ) : null}
    </>
  );
};
