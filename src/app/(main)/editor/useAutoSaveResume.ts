import useDebounce from "@/hooks/useDebounce"
import { ResumeValues } from "@/lib/validation"
import { useEffect, useState } from "react"

const useAutoSaveResume = (resumeData:ResumeValues) => {
  const debounceResumeData = useDebounce(resumeData,1500)
  const [lastSavedData,setLastSavedData] = useState(
    structuredClone(resumeData)
  )
  const [isSaving,setIsSaving] = useState(false)
  useEffect(() => {
    async function save() {
      setIsSaving(true)
      await new Promise(resolve=> setTimeout(resolve,1500))
      setLastSavedData(structuredClone(debounceResumeData))
      setIsSaving(false)
    }
    const hasUnsavedChanges = JSON.stringify(debounceResumeData) !== JSON.stringify(lastSavedData)
    if (hasUnsavedChanges && debounceResumeData && !isSaving) {
      save()
    }
  }, [debounceResumeData,isSaving,lastSavedData])
  return{
    isSaving,
    hasUnsavedChanges:JSON.stringify(resumeData) !== JSON.stringify(lastSavedData)
  }
}

export default useAutoSaveResume