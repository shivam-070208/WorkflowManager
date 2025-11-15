import { z } from "zod";
import { baseProcedure,createTRPCRouter } from "../init";
import { prisma } from "@/lib/db";
import { inngest } from "@/inngest/client";

export const appRouter = createTRPCRouter({
   
    inVokeIngest:baseProcedure.query(async()=>{
       
    })
})


export type AppRouter = typeof appRouter;