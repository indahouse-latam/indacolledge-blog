import { Button, Input } from "@nextui-org/react";
import Form from "next/form";
import { FormResetBtn } from "./FormResetBtn";
import { useLocale } from "next-intl";

export const SearchForm = ({ query }: { query?: string }) => {
  const locale = useLocale();

  return (
    <Form action={`/${locale}`} scroll={false} className="search-form">
      <Input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search a course"
        classNames={{
          inputWrapper: "bg-white shadow-none",
        }}
      />
      <div className="flex gap-2">
        {query && <FormResetBtn />}
        <Button
          type="submit"
          isIconOnly
          className="search-btn text-white text-xl"
        >
          <i
            className="icon-[lucide--search]"
            role="img"
            aria-hidden="true"
          ></i>
        </Button>
      </div>
    </Form>
  );
};
