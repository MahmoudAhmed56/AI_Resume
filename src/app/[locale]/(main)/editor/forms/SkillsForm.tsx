import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { EditorFormProps } from "@/lib/types"
import { SkillsValues, skillsSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"


const SkillsForm = ({resumeData,setResumeData,translation}:EditorFormProps) => {
  const {editorPage} = translation
  const {Skills} = editorPage
  const form = useForm<SkillsValues>({
    resolver:zodResolver(skillsSchema),
    defaultValues:{
      skills:resumeData.skills || []
    }
  }) 
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        skills: values.skills?.filter((skill) => skill !== undefined).map((skill)=>skill?.trim()).filter((skill): skill is Exclude<typeof skill, undefined> => 
        skill !== ""
      )
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">{Skills.title}</h2>
        <p className="text-sm text-muted-foreground">{Skills.subtitle}</p>
      </div>
      <Form {...form}>
      <form className="space-y-3">
        <FormField
        control={form.control}
        name="skills"
        render={({field})=>(
          <FormItem>
            <FormLabel className="sr-only">
            {Skills.title}
            </FormLabel>
            <FormControl>
              <Textarea
              {...field}
              placeholder={`${Skills.placeholder}`}
              onChange={(e)=>{
                const skills = e.target.value.split(/[,،]/)
                field.onChange(skills)
              }}
              />
            </FormControl>
            <FormDescription>
            {Skills.textareaMessage}
            </FormDescription>
            <FormMessage/>
          </FormItem>
        )}
        />
      </form>
      </Form>
    </div>
  )
}

export default SkillsForm