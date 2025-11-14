import {initTRPC} from '@trpc/server';
import { cache } from 'react'; // cache is a React function that helps to create memoized async functions for server components

export const createTRPCContext = cache(async ()=>{
    return {userId:"123"}
})

const t = initTRPC.create();

export const createTRPCRouter = t.router;
export const createCallerfactory = t.createCallerFactory;
export const baseProcedure = t.procedure;