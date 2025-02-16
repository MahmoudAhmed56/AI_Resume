import { Metadata } from "next"
import ResumeEditor from "./_components/ResumeEditor"

export const metadata : Metadata = {
  title: "Design your resumes",
}
const EditorPage = () => {
  return (
    <ResumeEditor/>
  )
}

export default EditorPage