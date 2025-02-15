"use client";

import { InviteFormType, inviteSchema } from "@/lib/schemas/invite-author";
import { useAuthStore } from "@/modules/auth/store/user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useLocale } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export const InviteButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuthStore((state) => state.user);

  const locale = useLocale();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteFormType>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: "viewer",
    },
  });

  const onSubmit: SubmitHandler<InviteFormType> = async (data) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          role: data.role,
          locale,
        }),
      });

      if (!response.ok) throw new Error("Failed to send invitation");

      toast("Invitation Sent");
    } catch {
      toast("Failed to send invitation. Please try again.");
    } finally {
      reset();
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      {user?.role === "admin" ? (
        <>
          <Button
            radius="full"
            className="hover-btn border-black font-medium"
            variant="bordered"
            onPress={() => setIsOpen(true)}
          >
            <span className="z-10 font-medium">Invite authors</span>
          </Button>

          <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <ModalContent>
              <ModalHeader>Invite an Author</ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <Input
                    label="Email"
                    type="email"
                    {...register("email")}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                  <Select
                    label="Role"
                    {...register("role")}
                    isInvalid={!!errors.role}
                    errorMessage={errors.role?.message}
                    defaultSelectedKeys={"viewer"}
                    selectionMode="single"
                    onSelectionChange={(e) => console.log(e)}
                  >
                    <SelectItem value="admin" key={"admin"}>
                      Admin
                    </SelectItem>
                    <SelectItem value="publisher" key={"publisher"}>
                      Publisher
                    </SelectItem>
                    <SelectItem value="viewer" key={"viewer"}>
                      Viewer
                    </SelectItem>
                  </Select>
                  <Button
                    isLoading={isLoading}
                    type="submit"
                    color="primary"
                    radius="full"
                  >
                    Send invitation
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onPress={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
