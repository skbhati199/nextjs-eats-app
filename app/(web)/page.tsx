import AppLogoText from "@/components/logo/app-logo";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col lg:p-8">
      <div className="flex flex-row space-x-4 max-w-6xl mx-auto justify-between">
        <AppLogoText />
        <div className="flex flex-row space-x-2 items-center">
          <Link href={"/dashboard"}><Button>Dasboard</Button></Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </main>
  );
}
