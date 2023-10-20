import { NextResponse as res } from "next/server";
import { userCollectionRef } from "@/app/firebaseConfig";
import { auth } from "@clerk/nextjs/server";
import { addDoc, collection, doc, deleteDoc } from "@firebase/firestore";

export async function POST(req) {
  const { userId } = auth();
  const payload = await req.json();
  const addressCollectionRef = collection(
    doc(userCollectionRef, userId),
    "addresses"
  );
  await addDoc(addressCollectionRef, payload, {
    merge: true,
  });
  return res.json(payload);
}

export async function DELETE(req) {
  const { url } = await req
  const editAddressId = new URL(url).searchParams.get("edit")
  const { userId } = auth();
  const addressCollectionRef = collection(
    doc(userCollectionRef, userId),
    "addresses"
  );
  await deleteDoc(doc(addressCollectionRef, editAddressId));
  return res.json({ message: "deleted" });
}


export async function GET(req) {
  const { userId } = auth();
  const addressCollectionRef = collection(
    doc(userCollectionRef, userId),
    "addresses"
  );
  const savedAddresses = await getDocs(addressCollectionRef);
  const addresses = savedAddresses.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.json({ addresses }).status(200);
}