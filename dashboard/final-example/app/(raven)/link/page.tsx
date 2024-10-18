import { TooltipProvider } from "@dub/ui/src/tooltip";
import WorkspaceLinksClient from './page-client'

export default function Page() {
  return (
    <TooltipProvider>
      <WorkspaceLinksClient />
    </TooltipProvider>
  )
}
