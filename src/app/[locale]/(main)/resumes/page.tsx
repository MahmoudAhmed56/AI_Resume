import prisma from "@/lib/prisma"
import { resumeDataInclude } from "@/lib/types"
import { auth } from "@clerk/nextjs/server"
import { Metadata } from "next"
import ResumeItem from "./ResumeItem"
import CreateResumeButton from "./CreateResumeButton"
import { getUserSubscriptionLevel } from "@/lib/subscription"
import { canCreateResume } from "@/lib/permissions"
import { getCurrentLocale } from "@/lib/getCurrentLocale"
import getTrans from "@/lib/translation"


export const metadata : Metadata = {
  title: "Your resumes",
}
const page = async() => {
  const {userId} = await auth()
  if(!userId){
    return;
  }
  const [resumes,totalCount,subscriptionLevel] = await Promise.all([
    prisma.resume.findMany({
      where:{
        userId
      },
      orderBy:{
        updatedAt:"desc"
      },
      include: resumeDataInclude
    }),
    prisma.resume.count({
      where:{
        userId
      }
    }),
    getUserSubscriptionLevel(userId)
  ])
  const locale = await getCurrentLocale()
  const {resumesPage,errors,resumeItem,resumePreview} = await getTrans(locale)
  return (
    <main className="max-w-7xl mx-auto w-full px-3 py-6 space-y-6">
      <CreateResumeButton canCreate={canCreateResume(subscriptionLevel,totalCount)}translation={resumesPage.newResumeButton} />
      <div className="space-y-1">
      <h1 className="text-3xl font-bold">{resumesPage.title}</h1>
      <p>{resumesPage.total}: {totalCount}</p>
      </div>
      <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} translation={{...resumeItem,...errors}} resumePreviewTrans={resumePreview}/>
        ))}
      </div>
    </main>
  )
}

export default page