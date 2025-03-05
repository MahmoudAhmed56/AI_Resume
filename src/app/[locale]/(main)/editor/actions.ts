"use server";

import { canCreateResume } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { ResumeValues, resumeSchema } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";

export const saveResume = async (values: ResumeValues) => {
  const { id } = values;
  const { photo, workExperiences, educations,languages,projects, ...resumeValues } =
    resumeSchema.parse(values);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const subscriptionLevel = await getUserSubscriptionLevel(userId)
  if (!id) {
    const resumeCount = await prisma.resume.count({ where: { userId } });
    if (!canCreateResume(subscriptionLevel, resumeCount)) {
      throw new Error(
        "Maximum resume count reached for this subscription level",
      );
    }
  }
  const existingResume = id
    ? await prisma.resume.findUnique({
        where: {
          id: id,
          userId: userId,
        },
      })
    : null;
  if (id && !existingResume) {
    throw new Error("Resume not found");
  }
  let newPhotoUrl: string | undefined | null = undefined;
  if (photo instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
      access: "public",
    });
    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    newPhotoUrl = null;
  }
  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,
        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        languages: {
          deleteMany: {},
          create: languages?.map((lang) => ({
            ...lang,
          })),
        },
        projects: {
          deleteMany: {},
          create: projects?.map((project) => ({
            ...project,
            projectLinks: {
              create: project.projectLinks?.map(link => ({
                ...link,
              })) || []
            }
          })) || []
        },
        educations: {
          deleteMany: {},
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        languages: {
          create: languages?.map((exp) => ({
            ...exp,
          })),
        },
          projects: {
          create: projects?.map((project) => ({
            ...project,
            projectLinks: {
              create: project.projectLinks?.map(link => ({
                ...link,
              })) || []
            }
          })) || []
        },
        educations: {
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    });
  }
};
export default saveResume;
