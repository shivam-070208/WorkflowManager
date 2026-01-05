import { Button } from "@/components/ui/button"
import { triggerWorkflowExecution } from "@/services/executions/lib/action";
import { Rocket } from "lucide-react";

const ExecuteWorkflow = ({
    workflowId
}:{
    workflowId:string
}) => {
    return (
        <Button onClick={()=>{
            triggerWorkflowExecution(workflowId);
        }} size="lg" className="bg-primary flex rounded-none font-semibold gap-2">  <Rocket  /> Execute Workflow
        </Button>
    );
}


export default ExecuteWorkflow;