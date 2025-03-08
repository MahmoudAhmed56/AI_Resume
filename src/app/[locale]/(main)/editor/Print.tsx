import { Button } from "@/components/ui/button"
import { RiFileDownloadLine } from "@remixicon/react"
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Print = (resume:any) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn: () => void = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  });
  return (
    <Button
    variant={"outline"}
    size={"icon"}
    title="download your resume"
    onClick={reactToPrintFn}
  >
    <RiFileDownloadLine className="size-5" />
  </Button>
  )
}

export default Print