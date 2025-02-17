import { tv } from "@nextui-org/react";

export const chipStyles = tv({
  base: "border-default cursor-pointer",
  variants: {
    isSelected: {
      true: "border-primary bg-primary-500 hover:border-primary-500 text-white pl-1",
      false: "text-default-500",
    },
  },
});
