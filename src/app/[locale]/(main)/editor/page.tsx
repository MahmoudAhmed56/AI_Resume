import { Metadata } from "next";
import ResumeEditor from "./_components/ResumeEditor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { resumeDataInclude } from "@/lib/types";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

export const metadata: Metadata = {
  title: "Design your resumes",
};

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

const EditorPage = async ({ searchParams }: PageProps) => {
  const locale = await getCurrentLocale()
  const translation = await getTrans(locale)
  const { resumeId } = await searchParams;
  const { userId } = await auth();
  if (!userId) {
    return null;
  }
  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: {
          id: resumeId,
          userId,
        },
        include: resumeDataInclude,
      })
    : null;
  return <ResumeEditor translation={translation} resumeToEdit={resumeToEdit} />;
};

export default EditorPage;
