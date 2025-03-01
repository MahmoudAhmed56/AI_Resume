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
import { PersonalInfoValues, personalInfoSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const PersonalInfoForm = ({ resumeData, setResumeData,translation }: EditorFormProps) => {
  const {editorPage} = translation
  const {PersonalInfo} = editorPage
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: resumeData.firstName || "",
      lastName: resumeData.lastName || "",
      jobTitle: resumeData.jobTitle || "",
      city: resumeData.city || "",
      country: resumeData.country || "",
      phone: resumeData.phone || "",
      email: resumeData.email || "",
    },
  });
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, ...values });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const photoInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">{PersonalInfo.title}</h2>
        <p className="text-sm text-muted-foreground">{PersonalInfo.subtitle}</p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="photo"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, ...fieldValues } }) => {
              return (
                <FormItem>
                  <FormLabel>{PersonalInfo.photo}</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        {...fieldValues}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          fieldValues.onChange(file);
                        }}
                        ref={photoInputRef}
                      />
                    </FormControl>
                    <Button variant="secondary" type="button" onClick={()=>{
                      fieldValues.onChange(null)
                      if(photoInputRef.current){
                        photoInputRef.current.value = ""
                      }
                    }}>
                      {PersonalInfo.removeButton}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{PersonalInfo.firstName}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{PersonalInfo.lastName}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{PersonalInfo.jobTitle}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{PersonalInfo.city}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{PersonalInfo.country}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{PersonalInfo.phone}</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{PersonalInfo.email}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfoForm;
