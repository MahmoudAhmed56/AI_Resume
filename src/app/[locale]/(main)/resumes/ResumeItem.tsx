"use client";

import ResumePreview from "@/components/ResumePreview";
import Link from "@/components/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import { MoreVertical, Printer, Trash2 } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { deleteResume } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/LoadingButton";
import { useReactToPrint } from "react-to-print";
import { useParams } from "next/navigation";
import { resumePreviewTrans } from "@/lib/translationsTypes";

interface ResumeItemProps {
  resume: ResumeServerData;
  resumePreviewTrans:resumePreviewTrans;
  translation:{
    delete: string;
    print: string;
    deleteResume: string;
    dialogDescription: string;
    cancel: string;
    noTitle: string;
    updated: string;
    created: string;
    somethingWentWrong: string;
  }
}

const ResumeItem = ({ resume,translation,resumePreviewTrans }: ResumeItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  });
  const {locale} = useParams()   
  const wasUpdated = resume.updatedAt !== resume.createdAt;
  return (
    <div className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border">
      <div className="space-y-3">
        <Link
          href={`editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-semibold">
            {resume.title || `${translation.noTitle}`}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? `${translation.updated}` : `${translation.created}`}{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>
        <Link
          href={`editor?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          <ResumePreview
            contentRef={contentRef}
            resumeData={mapToResumeValues(resume)}
            className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg" locale={locale} translation={resumePreviewTrans}          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>
      <MoreMenu translation={translation} resumeId={resume.id} onPrintClick={reactToPrintFn} />
    </div>
  );
};

export default ResumeItem;

interface MoreMenuProps {
  resumeId: string;
  onPrintClick: () => void;
  translation:{
    delete: string;
    print: string;
    deleteResume: string;
    dialogDescription: string;
    cancel: string;
    somethingWentWrong: string;
  }
}

function MoreMenu({ resumeId, onPrintClick,translation }: MoreMenuProps) {
  const {locale} = useParams()
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  return (
    <>
      <DropdownMenu dir={locale === "ar" ? "rtl" : "ltr"}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Trash2 className="size-4" />
            {translation.delete}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={onPrintClick}
          >
            <Printer className="size-4" />
            {translation.print}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmationDialog
        resumeId={resumeId}
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
        translation={translation}
      />
    </>
  );
}

interface DeleteConfirmationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  translation:{
    delete: string;
    deleteResume: string;
    dialogDescription: string;
    cancel: string;
    somethingWentWrong: string;
  }
}

function DeleteConfirmationDialog({
  resumeId,
  open,
  onOpenChange,translation
}: DeleteConfirmationDialogProps) {
  const {locale} = useParams()
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          description:  `${translation.somethingWentWrong}`,
        });
      }
    });
  }
  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent dir={locale === "ar" ? "rtl" : "ltr"}>
          <DialogHeader>
            <DialogTitle>{translation.deleteResume}</DialogTitle>
            <DialogDescription>
            {translation.dialogDescription}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <LoadingButton
              variant="destructive"
              onClick={handleDelete}
              loading={isPending}
            >
              {translation.delete}
            </LoadingButton>
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
            {translation.cancel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}
