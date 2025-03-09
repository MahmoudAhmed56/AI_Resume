"use client"
import { Button } from "@/components/ui/button"
import { useRefStore } from "@/hooks/store";
import { RiFileDownloadLine } from "@remixicon/react"
import { useEffect } from "react";
import { useRef } from 'react';
import generatePDF from 'react-to-pdf';
import { useReactToPrint } from "react-to-print";

const Print = (resume:any) => {
  // const sharedRef = useRefStore((state) => state.sharedRef?.current);
  const buttonRef = useRef<HTMLDivElement | undefined>(undefined);
  const {sharedRef,setSharedRef}= useRefStore()
  useEffect(() => {
    if (sharedRef?.current) {
      setSharedRef(sharedRef);
    }
  }, [sharedRef?.current]); // Update when ref changes
  // const sharedRef = useRef<HTMLDivElement | null>(null);
  console.log(sharedRef,"print");
  
  // const contentRef = useRef(sharedRef);
  const reactToPrintFn = useReactToPrint({
    buttonRef,
    documentTitle: "Resume",
  });
  return (
 <div
 ref={buttonRef}
 >
     <Button

     variant={"outline"}
     size={"icon"}
     title="download your resume"
     onClick={reactToPrintFn}
   >
     <RiFileDownloadLine className="size-5" />
   </Button>
 </div>
  )
}

export default Print