"use client";

import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { z } from "zod";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { toast } from "sonner";
import { createCourse } from "@/app/actions/course";
import { useRouter } from "@/modules/translations/i18n/routing";
import { courseFormSchema } from "@/lib/schemas/create-article-form-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@/types/sanity";
import { CreateArticleFormType } from "@/types/create-article.schema";

export const CreateArticleForm = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [body, setBody] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      categories: "",
      mainImage: "",
      body: "",
    },
  });

  const onSubmit: SubmitHandler<CreateArticleFormType> = async (data) => {
    try {
      const formValues = { ...data, body };

      const result = await createCourse(formValues);

      if (result.status === "SUCCESS") {
        toast.success("Your course has been created successfully");
        router.push(`/article/${result._id}`);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Check your inputs and try again");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="article-form">
      <Input
        {...register("title")}
        label="Title"
        placeholder="Article Title"
        errorMessage={errors.title?.message}
        isInvalid={!!errors.title}
      />

      <Select
        {...register("categories")}
        label="Categories"
        placeholder="Article categories"
        selectionMode="multiple"
        errorMessage={errors.categories?.message}
        isInvalid={!!errors.categories}
      >
        {categories?.map((category) => (
          <SelectItem key={category._id} value={category._id}>
            {category.title}
          </SelectItem>
        ))}
      </Select>
      <Input
        {...register("mainImage")}
        label="Image URL"
        placeholder="Article Image URL"
        errorMessage={errors.mainImage?.message}
        isInvalid={!!errors.mainImage}
      />
      <div data-color-mode="light">
        <MDEditor
          value={body}
          onChange={(value) => setBody(value as string)}
          id="body"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
      </div>

      <Button
        type="submit"
        className="article-form_btn text-white"
        isDisabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Your Pitch"}
        <i
          className="icon-[grommet-icons--send]"
          role="img"
          aria-hidden="true"
        ></i>
      </Button>
    </form>
  );
};
