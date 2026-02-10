import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Hello World from Gemini
      </h1>
      <Link href="/countries" className="text-2xl text-white mt-4">View Countries</Link>
    </main>
  );
}
