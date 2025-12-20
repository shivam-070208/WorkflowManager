import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react";

const ExecuteWorkflow = () => {
    return (
        <Button size="lg" className="bg-primary flex rounded-none font-semibold gap-2">            <Rocket  /> Execute Workflow
        </Button>
    );
}


export default ExecuteWorkflow;