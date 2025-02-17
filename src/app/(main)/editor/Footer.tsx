import Link from "@/components/link"
import { Button } from "@/components/ui/button";

interface FooterProps{
  currentStep: string;
  setCurrentStep: (step:string)=>void
}

const Footer = ({currentStep,setCurrentStep}:FooterProps) => {
  return (
    <footer className="w-full border-t px-3 py-5">
    <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
      <div className="flex items-center gap-3">
        <Button variant="secondary">Previous step</Button>
        <Button>Next step</Button>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="secondary" asChild>
          <Link href="/resumes">Close</Link>
        </Button>
        <p className="text-muted-foreground opacity-0">Saving...</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer