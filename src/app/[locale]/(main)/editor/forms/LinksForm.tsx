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
import { EditorFormProps } from "@/lib/types";
import { LinkValues, linkSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { UseFormReturn, useFieldArray, useForm } from "react-hook-form";

const LinksForm = ({
  resumeData,
  setResumeData,
}: EditorFormProps) => {
  const form = useForm<LinkValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      links: (resumeData.links || []).map(link => ({
        title: link.title || "", // Ensure required string
        link: link.link || ""    // Ensure required string
      })),
    },
  });  
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        links: (values.links || []).filter((link) => 
        link?.title?.trim() && link?.link?.trim()
      ) as { title: string; link: string }[]
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
        <h2 className="text-2xl font-semibold">Links</h2>
        <p className="text-sm text-muted-foreground">add links</p>
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
              add link
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
}
const LinkItem = ({ form, index, remove }: LinkItemItemProps) => {
  return (
    <div className="grid sm500min:flex sm500:grid-cols-2 gap-3">
      <FormField
        control={form.control}
        name={`links.${index}.title`}
        render={({ field }) => (
          <FormItem className="grow">
            <FormLabel>title</FormLabel>
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
            <FormLabel>link</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button variant="destructive" className="self-end" type="button" size={"icon"} onClick={() => remove(index)}>
        <X/>
      </Button>
    </div>
  );
};
