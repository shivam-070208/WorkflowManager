import { caller } from "@/trpc/server";
import Image from "next/image";

export default async function Home() {
const users = await caller.getUsers();
console.log(users);

  return (
    <div className="">
     Helllo
    </div>
  );
}
