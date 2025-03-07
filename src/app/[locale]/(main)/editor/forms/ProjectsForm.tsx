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
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { ProjectValues, optionalString } from "@/lib/validation";
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
import { Project } from "@/lib/translationsTypes";
import { z } from "zod";

const ProjectsForm = ({
  resumeData,
  setResumeData,
  translation,
}: EditorFormProps) => {
  const { editorPage } = translation;
  const { Project } = editorPage;
  const projectSchema = z.object({
    projects: z
      .array(
        z.object({
          project_name: optionalString,
          description: optionalString,
          projectLinks: z
            .array(
              z.object({
                title: optionalString,
                link: z
                  .string()
                  .trim()
                  .min(1, Project.validation.URL_REQUIRED)
                  .url(Project.validation.INVALID_URL), // Translation key
              }),
            )
            .optional(),
        }),
      )
      .optional(),
  });
  const form = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projects:
        resumeData.projects?.map((project) => ({
          project_name: project.project_name || "", // Ensure defined value
          description: project.description || "", // Ensure defined value
          projectLinks: project.projectLinks?.map((link) => ({
            title: link.title || "", // Fallback to empty string if undefined
            link: link.link || "", // Fallback to empty string if undefined
          })) || [{ title: "", link: "" }], // Ensure at least one link with empty values
        })) || [],
    },
  });
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;

      setResumeData({
        ...resumeData,
        projects: values.projects
          ?.filter(
            (project): project is Exclude<typeof project, undefined> =>
              project !== undefined,
          )
          ?.map((project) => ({
            ...project,
            projectLinks: project.projectLinks?.filter(
              (link): link is { link: string; title?: string } =>
                link !== undefined && link.link !== undefined, // Ensure `link` is defined and `link.link` is a string
            ),
          })),
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "projects",
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
        <h2 className="text-2xl font-semibold">{Project.title}</h2>
        <p className="text-sm text-muted-foreground">{Project.subtitle}</p>
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
                <ProjectItem
                  id={field.id}
                  form={form}
                  index={index}
                  remove={remove}
                  key={field.id}
                  project={Project}
                />
              ))}
            </SortableContext>
          </DndContext>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  project_name: "",
                  description: "",
                  projectLinks: [
                    {
                      title: "",
                      link: "",
                    },
                  ],
                })
              }
            >
              {Project.addProjectButton}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectsForm;

interface ProjectItemProps {
  id: string;
  form: UseFormReturn<ProjectValues>;
  index: number;
  remove: (index: number) => void;
  project: Project;
}

function ProjectItem({ id, form, index, remove, project }: ProjectItemProps) {
  const {
    fields: links,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control: form.control,
    name: `projects.${index}.projectLinks`,
  });
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
        <span className="font-semibold">
          {project.project} {index + 1}
        </span>
        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>
      <FormField
        control={form.control}
        name={`projects.${index}.project_name`}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>{project.project_name}</FormLabel>
              <FormControl>
                <Input {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <div className="space-y-2">
        {links.map((link, linkIndex) => (
          <div key={link.id} className="flex gap-2">
            <FormField
              control={form.control}
              name={`projects.${index}.projectLinks.${linkIndex}.title`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{project.linkTitle}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`projects.${index}.projectLinks.${linkIndex}.link`}
              render={({ field, fieldState }) => (
                <FormItem className="flex-1">
                  <FormLabel>{project.linkURL}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {fieldState.error && <FormMessage>test</FormMessage>}
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeLink(linkIndex)}
              className="mt-auto"
            >
              {project.removeButton}
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => appendLink({ title: "", link: "" })}
          variant="secondary"
        >
          {project.addLink}
        </Button>
      </div>
      <FormField
        control={form.control}
        name={`projects.${index}.description`}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>{project.description}</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <Button variant="destructive" type="button" onClick={() => remove(index)}>
        {project.removeButton}
      </Button>
    </div>
  );
}
