"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Links } from "@/lib/translationsTypes";
import { EditorFormProps } from "@/lib/types";
import { LinkValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { UseFormReturn, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const LinksForm = ({
  resumeData,
  setResumeData,
  translation,
}: EditorFormProps) => {
  const { editorPage } = translation;
  const { Links } = editorPage;
  const linkSchema = z.object({
    links: z
      .array(
        z.object({
          title: z
            .string()
            .trim()
            .min(1, Links.validation.TITLE_REQUIRED)
            .max(45, Links.validation.MAX_TITLE),
          link: z
            .string()
            .trim()
            .min(1, Links.validation.URL_REQUIRED)
            .url(Links.validation.INVALID_URL),
        }),
      )
      .optional(),
  });
  const form = useForm<LinkValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      links: (resumeData.links || []).map((link) => ({
        title: link.title || "", // Ensure required string
        link: link.link || "", // Ensure required string
      })),
    },
  });
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        links: (values.links || []).filter(
          (link) => link?.title?.trim() && link?.link?.trim(),
        ) as { title: string; link: string }[],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">{Links.title}</h2>
        <p className="text-sm text-muted-foreground">{Links.subtitle}</p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <LinkItem
              id={field.id}
              form={form}
              index={index}
              remove={remove}
              key={field.id}
              link={Links}
            />
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  title: "",
                  link: "",
                })
              }
            >
              {Links.addLinkButton}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LinksForm;

interface LinkItemItemProps {
  id: string;
  form: UseFormReturn<LinkValues>;
  index: number;
  remove: (index: number) => void;
  link: Links;
}
const LinkItem = ({ form, index, remove, link }: LinkItemItemProps) => {
  return (
    <div className="grid gap-3 sm500:grid-cols-2 sm500min:flex">
      <FormField
        control={form.control}
        name={`links.${index}.title`}
        render={({ field }) => (
          <FormItem className="grow">
            <FormLabel>{link.titleForm}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`links.${index}.link`}
        render={({ field }) => (
          <FormItem className="grow">
            <FormLabel>{link.link}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        variant="destructive"
        className="self-end"
        type="button"
        size={"icon"}
        onClick={() => remove(index)}
      >
        <X />
      </Button>
    </div>
  );
};
