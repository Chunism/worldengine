import QuestionAnswer from "@/components/QuestionAnswer";
import Link from "next/link";

//Add multiplayer demo using supabase realtime

export default function GameshowPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col gap-4">
          <Link
            href="/gameshow/host"
            className="w-full p-2 border rounded-lg hover:shadow bg-white"
          >
            Host Game
          </Link>
          <Link
            href="/gameshow/join"
            className="w-full p-2 border rounded-lg hover:shadow bg-white"
          >
            Join Game
          </Link>
        </div>
      </div>
    </main>
  );
}
