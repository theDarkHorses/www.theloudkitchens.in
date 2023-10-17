import { NextResponse as res } from "next/server";
import { userCollectionRef } from "@/app/firebaseConfig";

export async function GET(req) {
  console.log("collection ref",userCollectionRef);
  console.log("hello world");
  return res.json({ hello: "to you" });
}
// export async function GET(request) {
//   return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
// }
