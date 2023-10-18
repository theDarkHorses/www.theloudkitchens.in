import { NextResponse as res } from "next/server";
import { userCollectionRef } from "@/app/firebaseConfig";
import { auth } from "@clerk/nextjs/server";
import { addDoc, collection, doc } from "@firebase/firestore";

export async function POST(req) {
  const { userId } = auth();
  const payload = await req.json();
  const addressCollectionRef = collection(
    doc(userCollectionRef, userId),
    "addresses"
  );
  const settingDataToFirebase = await addDoc(addressCollectionRef, payload, {
    merge: true,
  });
  return res.json(payload);
}
