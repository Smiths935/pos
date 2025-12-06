// // src/lib/auth.ts
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/nextauth"; // adapt path to your nextauth config

// export async function getSessionOrThrow() {
//   const session = await getServerSession(authOptions);
//   if (!session) throw new Error("Unauthorized");
//   return session;
// }
