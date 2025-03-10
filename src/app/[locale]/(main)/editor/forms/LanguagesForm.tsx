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
import { LanguageValues, languageSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { UseFormReturn, useFieldArray, useForm } from "react-hook-form";

const LanguagesForm = ({
  resumeData,
  setResumeData,
  translation
}: EditorFormProps) => {
  const {editorPage} = translation
  const {Languages} = editorPage
  const form = useForm<LanguageValues>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      languages: resumeData.languages || [],
    },
  });
  
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        languages: (values.languages || []).filter(
          (lang): lang is Exclude<typeof lang, undefined> => lang !== undefined,
        ),
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "languages",
  });
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">{Languages.title}</h2>
        <p className="text-sm text-muted-foreground">{Languages.subtitle}</p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <LanguageItem
              id={field.id}
              form={form}
              index={index}
              remove={remove}
              key={field.id}
              translation={Languages}
            />
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  language: "",
                  level: "",
                })
              }
            >
              {Languages.addLanguageButton}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LanguagesForm;

interface LanguageItemItemProps {
  id: string;
  form: UseFormReturn<LanguageValues>;
  index: number;
  remove: (index: number) => void;
  translation: {
    title: string;
    subtitle: string;
    language: string;
    level: string;
    addLanguageButton: string;
}
}
const LanguageItem = ({ form, index, remove,translation }: LanguageItemItemProps) => {
  return (
    <div className="grid sm500min:flex sm500:grid-cols-2 gap-3">
      <FormField
        control={form.control}
        name={`languages.${index}.language`}
        render={({ field }) => (
          <FormItem className="grow">
            <FormLabel>{translation.language}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`languages.${index}.level`}
        render={({ field }) => (
          <FormItem className="grow">
            <FormLabel>{translation.level}</FormLabel>
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
