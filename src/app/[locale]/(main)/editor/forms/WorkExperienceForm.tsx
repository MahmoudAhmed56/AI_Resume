import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { WorkExperienceValues, workExperienceSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useEffect } from "react";
import { UseFormReturn, useFieldArray, useForm } from "react-hook-form";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

const WorkExperienceForm = ({ resumeData, setResumeData,translation }: EditorFormProps) => {
  const {WorkExperience} = translation
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        workExperiences:
          values.workExperiences?.filter((exp) => exp !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  function handelDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
      return arrayMove(fields, oldIndex, newIndex);
    }
  }
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">{WorkExperience.title}</h2>
        <p className="text-sm text-muted-foreground">
        {WorkExperience.subtitle}
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handelDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <WorkExperienceItem
                  id={field.id}
                  form={form}
                  index={index}
                  remove={remove}
                  key={field.id}
                  WorkExperience={WorkExperience}
                />
              ))}
            </SortableContext>
          </DndContext>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  company: "",
                  description: "",
                  endDate: "",
                  position: "",
                  startDate: "",
                })
              }
            >
              {WorkExperience.addWorkExperienceButton}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

interface WorkExperienceItemProps {
  id: string;
  form: UseFormReturn<WorkExperienceValues>;
  index: number;
  remove: (index: number) => void;
  WorkExperience: {
    title: string;
    subtitle: string;
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    dateMessage1: string;
    dateMessage2: string;
    dateMessage3: string;
    description: string;
    addWorkExperienceButton: string;
    removeButton: string;
}
}

function WorkExperienceItem({
  id,
  form,
  index,
  remove,
  WorkExperience
}: WorkExperienceItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  return (
    <div
      className={cn(
        "space-y-3 rounded-md border bg-background p-3",
        isDragging && "relative z-50 cursor-grabbing shadow-xl",
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">{WorkExperience.title} {index + 1}</span>
        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.position`}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>{WorkExperience.jobTitle}</FormLabel>
              <FormControl>
                <Input {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name={`workExperiences.${index}.company`}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>{WorkExperience.company}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.startDate`}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{WorkExperience.startDate}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    value={field.value?.slice(0, 10)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name={`workExperiences.${index}.endDate`}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{WorkExperience.endDate}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    value={field.value?.slice(0, 10)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
      <FormDescription>
      {WorkExperience.dateMessage1} <span className="font-semibold">{WorkExperience.dateMessage2}</span> {WorkExperience.dateMessage3}
      </FormDescription>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.description`}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>{WorkExperience.description}</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <Button variant="destructive" type="button" onClick={() => remove(index)}>
      {WorkExperience.removeButton}
      </Button>
    </div>
  );
}

export default WorkExperienceForm;
