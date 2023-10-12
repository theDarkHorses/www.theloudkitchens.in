import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <main className="container px-2">
    <div className="mx-auto">
      <SignIn />
    </div>
  </main>;
}