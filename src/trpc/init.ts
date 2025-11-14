import { auth } from '@/lib/auth';
import {initTRPC, TRPCError} from '@trpc/server';
import { headers } from 'next/headers';
import { cache } from 'react'; // cache is a React function that helps to create memoized async functions for server components

export const createTRPCContext = cache(async ()=>{
    return {userId:"123"}
})

const t = initTRPC.create();

export const createTRPCRouter = t.router;
export const createCallerfactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const ProtectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) {
        throw new TRPCError({ code: "UNAUTHORIZED",message:"UNAUTHORIZED" });
    }
    return next({ctx:{...ctx,auth:session}});
});