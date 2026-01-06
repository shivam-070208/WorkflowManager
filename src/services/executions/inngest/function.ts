import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { sortWorkflow } from "../lib/utils";
import { Node } from "@/generated/prisma/client";
import { ExecutionRegistry } from "../types/executor-registry";

 const ExecuteWorkflow = inngest.createFunction({
    id:"execute-workflow"
},{
    event:"workflow/execute"
},
async ({
    event,
    step
}) =>{

    const {id} = event.data;
    if(!id) throw new NonRetriableError("Id of workflow is required to execute");
    const data =await step.run("Fetching Workflow form Db",async ()=>{
        const data = await prisma?.workflow.findUniqueOrThrow({
            where:{
                id
            },
            include:{
                nodes:true,
                connections:true
            }
        })
        if(!data) throw new NonRetriableError("No Workflow Found save it before reunning")
        return data;
    })


    const sortedNodes = await step.run("Sorting Nodes", ()=>sortWorkflow(data.nodes,data.connections));

    
return {
    Message:"Running Workflow"
}
}
);

export { ExecuteWorkflow };