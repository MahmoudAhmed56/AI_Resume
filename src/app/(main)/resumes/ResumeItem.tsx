"use client";

import Link from "@/components/link";
import { ResumeServerData } from "@/lib/types";
import { formatDate } from "date-fns";

interface ResumeItemProps {
  resume: ResumeServerData;
}

const ResumeItem = ({ resume }: ResumeItemProps) => {
  const wasUpdated = resume.updatedAt !== resume.createdAt;
  return (
    <div className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border">
      <div className="space-y-3">
        <Link
          href={`editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-semibold">
            {resume.title || "No title"}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on {" "} {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ResumeItem;
